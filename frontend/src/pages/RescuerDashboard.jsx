import { useState } from 'react';
import { MapPin, Clock, Filter, AlertTriangle, Heart, CheckCircle, Phone, Camera, Navigation, User, Calendar, Star, Award, TrendingUp, Activity, Search, Eye, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';

const mockReports = [
  { 
    id: 1, 
    type: 'dog', 
    breed: 'Mixed Breed',
    description: 'Injured stray dog with limping left leg, appears malnourished', 
    location: 'Barangay Lahug, near IT Park', 
    status: 'reported', 
    date: '2025-01-15',
    time: '14:30',
    reportedBy: 'Maria Santos',
    urgency: 'high',
    distance: '2.3 km',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop',
    coordinates: { lat: 10.3157, lng: 123.8854 },
    contact: '+63 912 345 6789'
  },
  { 
    id: 2, 
    type: 'cat', 
    breed: 'Persian Mix',
    description: 'White cat with injured paw, hiding under parked car', 
    location: 'Barangay Guadalupe, Cebu City', 
    status: 'in_progress', 
    date: '2025-01-14',
    time: '10:15',
    reportedBy: 'John Doe',
    urgency: 'medium',
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop',
    coordinates: { lat: 10.3110, lng: 123.8920 },
    contact: '+63 923 456 7890'
  },
  { 
    id: 3, 
    type: 'dog', 
    breed: 'Golden Retriever',
    description: 'Friendly large dog, appears lost, wearing old collar', 
    location: 'Barangay Mabolo, Cebu City', 
    status: 'rescued', 
    date: '2025-01-13',
    time: '16:45',
    reportedBy: 'Lisa Chen',
    urgency: 'low',
    distance: '3.1 km',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop',
    coordinates: { lat: 10.3280, lng: 123.8950 },
    contact: '+63 934 567 8901'
  },
  { 
    id: 4, 
    type: 'cat', 
    breed: 'Siamese',
    description: 'Kitten stuck in drainage, rescue equipment needed', 
    location: 'Barangay Capitol Site, Cebu City', 
    status: 'reported', 
    date: '2025-01-15',
    time: '09:20',
    reportedBy: 'Alex Rivera',
    urgency: 'high',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=200&fit=crop',
    coordinates: { lat: 10.3200, lng: 123.8900 },
    contact: '+63 945 678 9012'
  }
];

export default function RescuerDashboard() {
  const [reports, setReports] = useState(mockReports);
  const [filter, setFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  const rescuerStats = {
    totalRescues: 47,
    thisMonth: 12,
    successRate: 96,
    rating: 4.8,
    activeReports: reports.filter(r => r.status === 'reported' || r.status === 'in_progress').length
  };

  const updateStatus = (id, newStatus) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const statusColors = {
    reported: 'bg-orange-500',
    in_progress: 'bg-purple-500',
    rescued: 'bg-green-500',
    adopted: 'bg-blue-500'
  };

  const urgencyColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    low: 'border-l-green-500 bg-green-50'
  };

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'active' ? 
      (report.status === 'reported' || report.status === 'in_progress') :
      activeTab === 'completed' ?
      (report.status === 'rescued' || report.status === 'adopted') :
      true;
    return matchesFilter && matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00273C] to-[#2C6975] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Rescuer Dashboard</h1>
              <p className="text-gray-200">Manage rescue operations and save lives</p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{rescuerStats.totalRescues}</div>
                <div className="text-sm text-gray-300">Total Rescues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{rescuerStats.thisMonth}</div>
                <div className="text-sm text-gray-300">This Month</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold">{rescuerStats.rating}</span>
                </div>
                <div className="text-sm text-gray-300">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{rescuerStats.activeReports}</div>
              <div className="text-sm text-gray-600">Active Reports</div>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{rescuerStats.totalRescues}</div>
              <div className="text-sm text-gray-600">Total Rescues</div>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{rescuerStats.successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{rescuerStats.thisMonth}</div>
              <div className="text-sm text-gray-600">This Month</div>
            </Card>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl">
          {[
            { id: 'active', label: 'Active Reports', icon: Activity },
            { id: 'completed', label: 'Completed', icon: CheckCircle },
            { id: 'all', label: 'All Reports', icon: Eye }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-orange-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location, animal type, or breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="reported">Reported</option>
              <option value="in_progress">In Progress</option>
              <option value="rescued">Rescued</option>
              <option value="adopted">Adopted</option>
            </select>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-l-4 ${urgencyColors[report.urgency]} hover:shadow-lg transition-all duration-200`}>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="lg:w-48 flex-shrink-0">
                    <img 
                      src={report.image} 
                      alt={`${report.type} in ${report.location}`}
                      className="w-full h-48 lg:h-32 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-xl text-gray-800 capitalize mb-1">
                          {report.breed} {report.type}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> 
                            {report.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> 
                            {report.date} at {report.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Navigation className="w-4 h-4" /> 
                            {report.distance} away
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          report.urgency === 'high' ? 'bg-red-100 text-red-800' :
                          report.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {report.urgency.toUpperCase()} PRIORITY
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors[report.status]}`}>
                          {report.status.replace('_', ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{report.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" /> 
                          Reported by {report.reportedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" /> 
                          {report.contact}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedReport(report)}
                          className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        
                        {report.status === 'reported' && (
                          <button 
                            onClick={() => updateStatus(report.id, 'in_progress')}
                            className="flex items-center gap-1 px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 rounded-lg text-sm font-medium transition-colors"
                          >
                            Start Rescue
                          </button>
                        )}
                        
                        {report.status === 'in_progress' && (
                          <button 
                            onClick={() => updateStatus(report.id, 'rescued')}
                            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg text-sm font-medium transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            Mark Rescued
                          </button>
                        )}
                        
                        {report.status === 'rescued' && (
                          <button 
                            onClick={() => updateStatus(report.id, 'adopted')}
                            className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Mark Adopted
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Report Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img 
                  src={selectedReport.image} 
                  alt={`${selectedReport.type} in ${selectedReport.location}`}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 capitalize mb-1">
                      {selectedReport.breed} {selectedReport.type}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedReport.location}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors[selectedReport.status]}`}>
                    {selectedReport.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedReport.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Report Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Reported by: {selectedReport.reportedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Date: {selectedReport.date} at {selectedReport.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Distance: {selectedReport.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{selectedReport.contact}</span>
                        </div>
                        <div className="text-gray-600">
                          <p>Coordinates: {selectedReport.coordinates.lat}, {selectedReport.coordinates.lng}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Reporter
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
