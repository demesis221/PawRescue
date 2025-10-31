const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const API_URL = 'http://localhost:5000/api';

// Create new report
exports.createReport = async (req, res) => {
  try {
    const {
      animalType,
      breed,
      urgency,
      description,
      location,
      contactPhone,
      coordinates,
      userId
    } = req.body;

    let imageUrl = null;

    // Upload image to Supabase Storage if provided
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('animal_images')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Failed to upload image');
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('animal_images')
        .getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    const [lat, lng] = JSON.parse(coordinates);

    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
          animal_type: animalType,
          breed: breed || null,
          urgency,
          description,
          location_name: location,
          latitude: lat,
          longitude: lng,
          image_urls: imageUrl ? [imageUrl] : [],
          contact_phone: contactPhone,
          status: 'reported',
          user_id: userId || null
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      data: data[0]
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit report',
      error: error.message
    });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const { status, urgency } = req.query;
    
    let query = supabase.from('reports').select('*').order('created_at', { ascending: false });
    
    if (status) query = query.eq('status', status);
    if (urgency) query = query.eq('urgency', urgency);

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports',
      error: error.message
    });
  }
};

// Get report by ID
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report',
      error: error.message
    });
  }
};

// Update report status
exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('reports')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Report status updated',
      data: data[0]
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update report',
      error: error.message
    });
  }
};

// Delete report
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('reports')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete report',
      error: error.message
    });
  }
};
