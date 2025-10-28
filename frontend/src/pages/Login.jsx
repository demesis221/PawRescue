import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AtSign, Lock, AlertCircle, PawPrint, Shield, Users, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../components/Card'

export default function Login() {
  const [formData, setFormData] = useState({ identifier: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    let email = formData.identifier

    // Check if identifier is username (no @ symbol)
    if (!formData.identifier.includes('@')) {
      // Look up email by username
      const { data, error: lookupError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', formData.identifier.toLowerCase())
        .single()

      if (lookupError || !data) {
        setError('Username not found')
        setLoading(false)
        return
      }
      email = data.email
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: formData.password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-5xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col items-center justify-center text-center p-12 bg-gradient-to-br from-orange-50 to-teal-50"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6 shadow-2xl">
              <PawPrint className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Welcome Back
            </h1>
            <p className="text-xl text-gray-600 mb-8">Sign in to continue helping animals</p>
            
            <div className="space-y-6 text-left w-full max-w-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Secure Access</h3>
                  <p className="text-sm text-gray-600">Your account is protected with industry-standard security</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Join the Community</h3>
                  <p className="text-sm text-gray-600">Connect with thousands of animal rescuers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Save Lives</h3>
                  <p className="text-sm text-gray-600">Every login brings you closer to helping animals</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 lg:p-12"
          >
            <div className="text-center lg:hidden mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-4 shadow-lg">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to continue helping animals</p>
            </div>
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username or Email
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="username or email@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                Create Account
              </Link>
            </div>
          </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </div>
      </Card>
    </div>
  )
}
