import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    })
    return { data, error }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }
}

// Reports API
export const reports = {
  getAll: async (filters = {}) => {
    let query = supabase.from('reports').select('*, profiles(full_name, email)')
    
    if (filters.status) query = query.eq('status', filters.status)
    if (filters.urgency) query = query.eq('urgency', filters.urgency)
    if (filters.animal_type) query = query.eq('animal_type', filters.animal_type)
    
    const { data, error } = await query.order('created_at', { ascending: false })
    return { data, error }
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('reports')
      .select('*, profiles(full_name, email, phone)')
      .eq('id', id)
      .single()
    return { data, error }
  },

  create: async (reportData) => {
    const { data, error } = await supabase.from('reports').insert(reportData).select().single()
    return { data, error }
  },

  update: async (id, updates) => {
    const { data, error } = await supabase.from('reports').update(updates).eq('id', id).select().single()
    return { data, error }
  },

  delete: async (id) => {
    const { error } = await supabase.from('reports').delete().eq('id', id)
    return { error }
  },

  updateStatus: async (reportId, newStatus, comment = null) => {
    const user = await auth.getUser()
    const { data, error } = await supabase.rpc('update_report_status', {
      report_uuid: reportId,
      new_status: newStatus,
      user_uuid: user.id,
      status_comment: comment
    })
    return { data, error }
  }
}

// Storage helpers
export const storage = {
  uploadImage: async (file, reportId) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${reportId}/${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('animal_images')
      .upload(fileName, file)
    
    if (error) return { data: null, error }
    
    const { data: { publicUrl } } = supabase.storage
      .from('animal_images')
      .getPublicUrl(fileName)
    
    return { data: publicUrl, error: null }
  },

  deleteImage: async (filePath) => {
    const { error } = await supabase.storage.from('animal_images').remove([filePath])
    return { error }
  }
}

// Dashboard stats
export const dashboard = {
  getStats: async () => {
    const { data, error } = await supabase.rpc('get_dashboard_stats')
    return { data, error }
  }
}

// Real-time subscriptions
export const subscriptions = {
  subscribeToReports: (callback) => {
    return supabase
      .channel('reports')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, callback)
      .subscribe()
  },

  unsubscribe: (channel) => {
    supabase.removeChannel(channel)
  }
}
