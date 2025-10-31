const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Get all reports
app.get('/api/reports', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create report
app.post('/api/reports', upload.single('image'), async (req, res) => {
  try {
    const { userId, animalType, breed, urgency, description, location, contactPhone, coordinates } = req.body;
    const coords = JSON.parse(coordinates);

    const reportData = {
      user_id: userId,
      animal_type: animalType,
      breed: breed || null,
      description,
      location_name: location,
      latitude: coords[0],
      longitude: coords[1],
      urgency,
      contact_phone: contactPhone,
      status: 'reported'
    };

    const { data: report, error: reportError } = await supabase
      .from('reports')
      .insert(reportData)
      .select()
      .single();

    if (reportError) throw reportError;

    // Upload image if provided
    if (req.file && report) {
      const fileExt = req.file.originalname.split('.').pop();
      const fileName = `${report.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('animal_images')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype
        });

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('animal_images')
          .getPublicUrl(fileName);

        await supabase
          .from('reports')
          .update({ image_urls: [publicUrl] })
          .eq('id', report.id);
      }
    }

    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update report status
app.patch('/api/reports/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, userId, comment } = req.body;

    const { error } = await supabase.rpc('update_report_status', {
      report_uuid: id,
      new_status: status,
      user_uuid: userId,
      status_comment: comment
    });

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('get_dashboard_stats');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
