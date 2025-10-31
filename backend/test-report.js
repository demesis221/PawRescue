// Quick test to create a sample report
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function createTestReport() {
  console.log('Creating test report...');
  
  // First, get a user ID (you'll need to replace this with an actual user ID from your auth.users table)
  const { data: users } = await supabase.from('profiles').select('id').limit(1);
  
  if (!users || users.length === 0) {
    console.log('No users found. Please register a user first.');
    return;
  }

  const userId = users[0].id;
  console.log('Using user ID:', userId);

  const testReport = {
    user_id: userId,
    animal_type: 'dog',
    breed: 'Mixed Breed',
    description: 'Friendly stray dog near the park, appears healthy',
    location_name: 'Barangay Lahug, Cebu City',
    latitude: 10.3157,
    longitude: 123.8854,
    urgency: 'medium',
    contact_phone: '+63 912 345 6789',
    status: 'reported'
  };

  const { data, error } = await supabase
    .from('reports')
    .insert(testReport)
    .select()
    .single();

  if (error) {
    console.error('Error creating report:', error);
  } else {
    console.log('Test report created successfully!');
    console.log('Report ID:', data.id);
  }

  // Check total reports
  const { data: allReports } = await supabase.from('reports').select('*');
  console.log(`Total reports in database: ${allReports?.length || 0}`);
}

createTestReport();
