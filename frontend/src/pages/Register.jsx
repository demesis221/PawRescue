import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Mail, User, Lock, AlertCircle, CheckCircle, Eye, EyeOff, PawPrint, AtSign } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../components/Card'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    calculatePasswordStrength(formData.password)
  }, [formData.password])

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    setPasswordStrength(strength)
  }

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500'
    if (passwordStrength <= 2) return 'bg-orange-500'
    if (passwordStrength <= 3) return 'bg-yellow-500'
    if (passwordStrength <= 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (passwordStrength === 0) return ''
    if (passwordStrength <= 1) return 'Weak'
    if (passwordStrength <= 2) return 'Fair'
    if (passwordStrength <= 3) return 'Good'
    if (passwordStrength <= 4) return 'Strong'
    return 'Very Strong'
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (passwordStrength < 2) {
      setError('Please use a stronger password')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: formData.fullName,
          username: formData.username
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else if (data.user) {
      // Manually create profile if trigger fails
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: formData.email,
          full_name: formData.fullName,
          username: formData.username
        })
      
      if (profileError) {
        console.error('Profile creation error:', profileError)
      }
      
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-6xl shadow-2xl overflow-hidden">
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
              Join PawRescue
            </h1>
            <p className="text-xl text-gray-600 mb-8">Start making a difference today</p>
            
            <div className="space-y-6 text-left w-full max-w-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Create Your Profile</h3>
                  <p className="text-sm text-gray-600">Join our community of animal lovers and rescuers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <PawPrint className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Report & Rescue</h3>
                  <p className="text-sm text-gray-600">Help save animals in need across your community</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Make an Impact</h3>
                  <p className="text-sm text-gray-600">Track your contributions and see lives saved</p>
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
                Join PawRescue
              </h1>
              <p className="text-gray-600">Start making a difference today</p>
            </div>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Juan Dela Cruz"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
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
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: i < passwordStrength ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className={`h-1 flex-1 rounded-full ${i < passwordStrength ? getStrengthColor() : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${passwordStrength <= 1 ? 'text-red-600' : passwordStrength <= 2 ? 'text-orange-600' : passwordStrength <= 3 ? 'text-yellow-600' : passwordStrength <= 4 ? 'text-blue-600' : 'text-green-600'}`}>
                    {getStrengthText()}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-600 mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  Passwords do not match
                </motion.p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-green-600 mt-1 flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3" />
                  Passwords match
                </motion.p>
              )}
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                Sign In
              </Link>
            </div>
          </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </div>
      </Card>
    </div>
  )
}
