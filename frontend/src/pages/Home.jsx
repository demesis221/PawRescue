import { Link } from 'react-router-dom';
import { MapPin, Camera, Heart, Phone, Mail, Shield, Users, Award, Star, AlertTriangle, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Home() {
  return (
    <div>
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-500 to-teal-600 text-white text-sm py-2">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <div className="font-medium flex items-center gap-2"><Heart className="w-4 h-4" /> Emergency Rescue Hotline: Available 24/7</div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +63 900 000 0000</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@pawrescue.app</div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative gradient-bg hero-pattern text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Save Lives,<br />
              <span className="text-gradient">One Paw</span> at a Time
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10">
              Join our community of animal lovers. Report strays, coordinate rescues, and help give every animal a chance at a loving home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report">
                <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Report a Stray Now
                </button>
              </Link>
              <Link to="/about">
                <button className="btn-secondary text-lg px-8 py-4">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="text-4xl font-bold text-orange-500 mb-2">1,247</div>
              <div className="text-gray-600">Animals Rescued</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="text-4xl font-bold text-teal-600 mb-2">856</div>
              <div className="text-gray-600">Successful Adoptions</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,341</div>
              <div className="text-gray-600">Community Members</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How PawRescue Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple steps to make a difference in an animal's life</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="card-hover"
            >
              <Card>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white mb-6">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-4">1. Report Location</h3>
                  <p className="text-gray-600">Spot a stray? Pin the exact location on our interactive map with just a few taps.</p>
                </div>
              </Card>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="card-hover"
            >
              <Card>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 text-white mb-6">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-4">2. Share Details</h3>
                  <p className="text-gray-600">Upload photos and describe the animal's condition to help rescuers prepare.</p>
                </div>
              </Card>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="card-hover"
            >
              <Card>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white mb-6">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-4">3. Rescue & Care</h3>
                  <p className="text-gray-600">Our network of volunteers and professionals respond quickly to provide care.</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Recent Success Stories</h2>
            <p className="text-xl text-gray-600">Every rescue makes a difference</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <Card className="card-hover">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400" className="w-full h-48 object-cover rounded-t-lg" alt="rescued dog" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"><Heart className="w-3 h-3" /> Rescued</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2">Max Found His Forever Home</h4>
                  <p className="text-gray-600 text-sm mb-3">Rescued from Lahug, now living happily with the Santos family</p>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <Card className="card-hover">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400" className="w-full h-48 object-cover rounded-t-lg" alt="rescued cat" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">🏥 In Care</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2">Luna's Recovery Journey</h4>
                  <p className="text-gray-600 text-sm mb-3">Currently receiving medical care, looking for adoption</p>
                  <div className="text-sm text-gray-500">📍 Guadalupe, Cebu City</div>
                </div>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <Card className="card-hover">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400" className="w-full h-48 object-cover rounded-t-lg" alt="rescued puppy" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">🔍 Reported</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2">Buddy Needs Help</h4>
                  <p className="text-gray-600 text-sm mb-3">Young puppy spotted near IT Park, rescue team dispatched</p>
                  <div className="text-sm text-gray-500">📍 Lahug, Cebu City</div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"Thanks to PawRescue, I was able to help save a injured dog. The response was so quick!"</p>
                <div className="font-semibold">Maria Santos</div>
                <div className="text-sm text-gray-500">Cebu City Resident</div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"As a rescuer, this app makes coordination so much easier. Love the real-time updates!"</p>
                <div className="font-semibold">Dr. Juan Cruz</div>
                <div className="text-sm text-gray-500">Veterinarian & Rescuer</div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"Found my best friend through PawRescue. The adoption process was seamless and caring."</p>
                <div className="font-semibold">Anna Reyes</div>
                <div className="text-sm text-gray-500">Pet Adopter</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of animal lovers in our mission to rescue, rehabilitate, and rehome stray animals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report">
                <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Report a Stray Now
                </button>
              </Link>
              <Link to="/about">
                <button className="bg-white/20 backdrop-blur text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
