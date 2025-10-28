import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, AtSign, Phone, Camera, Save, Loader, Shield, Award, Heart, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../components/Card'

export default function Profile() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        username: profile.username || '',
        phone: profile.phone || ''
      })
      setAvatarUrl(profile.avatar_url || '')
    }
  }, [profile])

  // Separate effect for auth check - only redirect if definitely not logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/login')
      }
    }
    checkAuth()
  }, [])

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file' })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image must be less than 5MB' })
      return
    }

    setUploading(true)
    setMessage({ type: '', text: '' })

    try {
      // Delete old avatar if exists
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop()
        await supabase.storage.from('avatars').remove([`${user.id}/${oldPath}`])
      }

      // Upload new avatar
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)

      if (updateError) throw updateError

      setAvatarUrl(publicUrl)
      setMessage({ type: 'success', text: 'Profile photo updated!' })
      // Reload profile data instead of full page reload
      setTimeout(async () => {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (data) {
          setAvatarUrl(data.avatar_url || '')
        }
      }, 500)
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setUploading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        username: formData.username,
        phone: formData.phone
      })
      .eq('id', user.id)

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      // Reload profile data instead of full page reload
      setTimeout(async () => {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (data) {
          setFormData({
            full_name: data.full_name || '',
            username: data.username || '',
            phone: data.phone || ''
          })
        }
        setMessage({ type: '', text: '' })
      }, 1500)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 shadow-xl text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent mb-6">My Profile</h1>
                <div className="relative inline-block mb-4">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
                      {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border-2 border-orange-500 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <Loader className="w-5 h-5 text-orange-500 animate-spin" />
                    ) : (
                      <Camera className="w-5 h-5 text-orange-500" />
                    )}
                  </label>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile?.full_name || 'User'}</h2>
                <p className="text-gray-600 mb-4">@{profile?.username || 'username'}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  <Shield className="w-4 h-4" />
                  {profile?.role || 'User'}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-orange-500" />
                      Reports Made
                    </span>
                    <span className="font-bold text-gray-800">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Award className="w-4 h-4 text-teal-500" />
                      Animals Saved
                    </span>
                    <span className="font-bold text-gray-800">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      Active Rescues
                    </span>
                    <span className="font-bold text-gray-800">0</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Edit Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h3>

                <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Juan Dela Cruz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s/g, '') })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="juandelacruz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="+63 912 345 6789"
                  />
                </div>
              </div>

              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-xl ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  {message.text}
                </motion.div>
              )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
