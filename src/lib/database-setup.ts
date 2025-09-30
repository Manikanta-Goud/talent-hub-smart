// Database setup utility
import { supabase } from './supabase'

export async function setupDatabase() {
  console.log('🔧 Setting up database...')
  
  try {
    // Test basic connection
    console.log('📡 Testing Supabase connection...')
    const { data: connectionTest, error: connectionError } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true })
    
    if (connectionError && connectionError.code === 'PGRST116') {
      console.log('⚠️ Profiles table does not exist, will be created by Supabase when first record is inserted')
    } else if (connectionError) {
      console.error('❌ Database connection failed:', connectionError)
      return { success: false, error: connectionError.message }
    } else {
      console.log('✅ Database connection successful, profiles table exists')
    }
    
    // Test creating a profile
    console.log('🧪 Testing profile creation...')
    const testUserId = 'test-db-setup-' + Date.now()
    const testEmail = `test-${Date.now()}@example.com`
    
    const { data: testProfile, error: createError } = await supabase
      .from('profiles')
      .insert([{
        user_id: testUserId,
        email: testEmail,
        full_name: 'Test User',
        role: 'student',
        skills: ['JavaScript', 'React']
      }])
      .select()
      .single()
    
    if (createError) {
      console.error('❌ Failed to create test profile:', createError)
      return { success: false, error: createError.message }
    }
    
    console.log('✅ Test profile created successfully:', testProfile)
    
    // Clean up test profile
    await supabase
      .from('profiles')
      .delete()
      .eq('user_id', testUserId)
    
    console.log('🧹 Test profile cleaned up')
    
    return { 
      success: true, 
      message: 'Database setup completed successfully!' 
    }
    
  } catch (error) {
    console.error('💥 Database setup failed:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function checkDatabaseHealth() {
  console.log('🔍 Checking database health...')
  
  try {
    // Check if we can connect to Supabase
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('❌ Database health check failed:', error)
      return { healthy: false, error: error.message }
    }
    
    console.log('✅ Database is healthy')
    return { healthy: true, profileCount: data || 0 }
    
  } catch (error) {
    console.error('💥 Database health check error:', error)
    return { 
      healthy: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}