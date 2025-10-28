import { Heart, Target, Users, Mail, Shield, Award, Clock, MapPin, Phone, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#00273C] to-[#2C6975] text-white py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=800&fit=crop)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#00273C]/70 via-[#1a4a5c]/60 to-[#2C6975]/70"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About PawRescue</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              Empowering communities to save lives, one paw at a time through technology, compassion, and collective action.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Founded in 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Cebu, Philippines</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>2,341+ Members</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-gray-600">Making a real difference in our community</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">1,247</div>
              <div className="text-gray-600">Animals Rescued</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-teal-600 mb-2">856</div>
              <div className="text-gray-600">Successful Adoptions</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Emergency Response</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Foundation</h2>
            <p className="text-xl text-gray-600">Built on compassion, driven by technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card hover className="text-center h-full">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white mb-6">
                  <Target className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">To create a compassionate community where every stray animal gets the help they need through innovative technology, rapid response, and collaborative care.</p>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card hover className="text-center h-full">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 text-white mb-6">
                  <Heart className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">A world where no stray animal is left behind, and communities work together seamlessly to ensure their safety, health, and well-being.</p>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card hover className="text-center h-full">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white mb-6">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Our Community</h3>
                <p className="text-gray-600 leading-relaxed">Join thousands of caring individuals, professional rescuers, and local officials making a real difference in their neighborhoods every day.</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600">How PawRescue came to life</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop" 
                alt="Team rescuing animals" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <Card className="p-8">
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  PawRescue was born from a simple yet powerful observation: too many stray animals were suffering on our streets, 
                  and while there were caring people willing to help, there was no efficient way to connect those in need with those who could provide aid.
                </p>
                <p className="mb-6">
                  Founded in 2023 in Cebu, Philippines, our platform bridges the gap between animal lovers, professional rescuers, 
                  and local authorities. We believe that technology can amplify compassion and create lasting change in how communities 
                  care for their most vulnerable members.
                </p>
                <p>
                  Today, PawRescue operates 24/7, connecting thousands of users across the region and facilitating rapid response 
                  to animal emergencies. Every rescue, every adoption, and every life saved strengthens our belief that together, 
                  we can create a more compassionate world.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Passionate individuals dedicated to animal welfare</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <Card hover className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" 
                  alt="Maria Santos" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-orange-200"
                />
                <h4 className="font-bold text-xl mb-2">Maria Santos</h4>
                <p className="text-orange-600 font-semibold mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">Veterinarian with 10+ years of experience in animal rescue and rehabilitation.</p>
                <div className="flex justify-center mt-4">
                  <div className="flex text-yellow-500">
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
              <Card hover className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" 
                  alt="Alex Rivera" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-teal-200"
                />
                <h4 className="font-bold text-xl mb-2">Alex Rivera</h4>
                <p className="text-teal-600 font-semibold mb-3">Head of Operations</p>
                <p className="text-gray-600 text-sm">Coordinates rescue operations and manages our network of volunteer rescuers.</p>
                <div className="flex justify-center mt-4">
                  <div className="flex text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <Card hover className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" 
                  alt="Lisa Chen" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-purple-200"
                />
                <h4 className="font-bold text-xl mb-2">Lisa Chen</h4>
                <p className="text-purple-600 font-semibold mb-3">Community Manager</p>
                <p className="text-gray-600 text-sm">Builds relationships with local communities and educates about animal welfare.</p>
                <div className="flex justify-center mt-4">
                  <div className="flex text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact in Action</h2>
            <p className="text-xl text-gray-600">See the difference we're making together</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop" 
                  alt="Rescue operation" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h4 className="font-bold text-lg mb-2">Emergency Rescue</h4>
                    <p className="text-sm">24/7 response team in action</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop" 
                  alt="Happy adopted dog" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h4 className="font-bold text-lg mb-2">Success Stories</h4>
                    <p className="text-sm">Happy endings for rescued animals</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop" 
                  alt="Community volunteers" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h4 className="font-bold text-lg mb-2">Community Care</h4>
                    <p className="text-sm">Volunteers making a difference</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg mb-2">Compassion</h4>
                <p className="text-gray-600 text-sm">Every decision is made with empathy and care for animals in need.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg mb-2">Urgency</h4>
                <p className="text-gray-600 text-sm">Time matters when lives are at stake. We respond quickly and efficiently.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg mb-2">Integrity</h4>
                <p className="text-gray-600 text-sm">Transparent operations and honest communication build trust in our community.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg mb-2">Excellence</h4>
                <p className="text-gray-600 text-sm">Continuous improvement in our services and impact on animal welfare.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300">Have questions? We'd love to hear from you</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Emergency Hotline</div>
                    <div className="text-gray-300">+63 900 000 0000 (24/7)</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Support</div>
                    <div className="text-gray-300">support@pawrescue.app</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Headquarters</div>
                    <div className="text-gray-300">Cebu City, Philippines</div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="bg-white">
              <h3 className="font-bold text-2xl mb-6 text-center text-gray-800">Send us a Message</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>Report an Issue</option>
                  <option>Partnership</option>
                  <option>Volunteer</option>
                </select>
                <textarea 
                  placeholder="Your Message" 
                  rows="4" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
        </div>
  );
}
