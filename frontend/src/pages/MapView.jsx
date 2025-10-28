import { useState } from 'react';
import { MapPin, Filter, Search, Clock, Heart, AlertTriangle, CheckCircle, Eye, Calendar, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';

const mockReports = [
  { 
    id: 1, 
    type: 'dog', 
    breed: 'Mixed Breed',
    location: 'Barangay Lahug, Cebu City', 
    status: 'reported', 
    lat: 10.3157, 
    lng: 123.8854,
    reportedBy: 'Maria Santos',
    reportedAt: '2 hours ago',
    description: 'Injured stray dog near IT Park, limping on left leg',
    urgency: 'high',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    type: 'cat', 
    breed: 'Persian Mix',
    location: 'Barangay Guadalupe, Cebu City', 
    status: 'rescued', 
    lat: 10.3110, 
    lng: 123.8920,
    reportedBy: 'John Doe',
    reportedAt: '1 day ago',
    description: 'Friendly cat found in parking lot, appears well-fed',
    urgency: 'medium',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    type: 'dog', 
    breed: 'Golden Retriever',
    location: 'Barangay Mabolo, Cebu City', 
    status: 'adopted', 
    lat: 10.3280, 
    lng: 123.8950,
    reportedBy: 'Lisa Chen',
    reportedAt: '3 days ago',
    description: 'Lost dog found wearing collar, very friendly',
    urgency: 'low',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    type: 'cat', 
    breed: 'Siamese',
    location: 'Barangay Capitol Site, Cebu City', 
    status: 'in_progress', 
    lat: 10.3200, 
    lng: 123.8900,
    reportedBy: 'Alex Rivera',
    reportedAt: '5 hours ago',
    description: 'Kitten stuck under car, rescue team dispatched',
    urgency: 'high',
    image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    type: 'dog', 
    breed: 'Labrador Mix',
    location: 'Barangay Banilad, Cebu City', 
    status: 'reported', 
    lat: 10.3350, 
    lng: 123.9100,
    reportedBy: 'Sarah Johnson',
    reportedAt: '30 minutes ago',
    description: 'Pregnant dog seeking shelter near construction site',
    urgency: 'high',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop'
  }
];

export default function MapView() {
  const [filter, setFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const statusColors = {
    reported: 'bg-orange-500',
    rescued: 'bg-green-500',
    adopted: 'bg-blue-500',
    in_progress: 'bg-purple-500'
  };

  const statusIcons = {
    reported: AlertTriangle,
    rescued: Heart,
    adopted: CheckCircle,
    in_progress: Clock
  };

  const urgencyColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    low: 'border-l-green-500 bg-green-50'
  };

  const filteredReports = mockReports.filter(report => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: mockReports.length,
    reported: mockReports.filter(r => r.status === 'reported').length,
    rescued: mockReports.filter(r => r.status === 'rescued').length,
    adopted: mockReports.filter(r => r.status === 'adopted').length,
    in_progress: mockReports.filter(r => r.status === 'in_progress').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00273C] to-[#2C6975] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rescue Map</h1>
            <p className="text-xl text-gray-200 mb-8">Track rescue operations and help animals in need across Cebu City</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Reports</div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-orange-500">{stats.reported}</div>
              <div className="text-sm text-gray-600">Reported</div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-purple-500">{stats.in_progress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-500">{stats.rescued}</div>
              <div className="text-sm text-gray-600">Rescued</div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-blue-500">{stats.adopted}</div>
              <div className="text-sm text-gray-600">Adopted</div>
            </Card>
          </motion.div>
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[700px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Interactive Rescue Map</h3>
                  <p className="text-gray-600 mb-6 max-w-md">Real-time tracking of rescue operations across Cebu City. Map integration with Leaflet coming soon.</p>
                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-2"></div>
                      <div className="text-xs text-gray-600">Reported</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-2"></div>
                      <div className="text-xs text-gray-600">In Progress</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <div className="text-xs text-gray-600">Rescued</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                      <div className="text-xs text-gray-600">Adopted</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl">Active Reports</h3>
              <span className="text-sm text-gray-500">{filteredReports.length} results</span>
            </div>
            <div className="max-h-[700px] overflow-y-auto space-y-3">
              {filteredReports.map((report, index) => {
                const StatusIcon = statusIcons[report.status];
                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      hover 
                      className={`cursor-pointer border-l-4 ${urgencyColors[report.urgency]} transition-all duration-200`} 
                      onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex gap-4">
                        <img 
                          src={report.image} 
                          alt={`${report.type} in ${report.location}`}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-800 capitalize truncate">
                              {report.breed} {report.type}
                            </h4>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${statusColors[report.status]}`}>
                              <StatusIcon className="w-3 h-3" />
                              <span className="capitalize">{report.status.replace('_', ' ')}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{report.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{report.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{report.reportedAt}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
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
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${statusColors[selectedReport.status]}`}>
                  {selectedReport.status.replace('_', ' ').toUpperCase()}
                </div>
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
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedReport.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    selectedReport.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedReport.urgency.toUpperCase()} PRIORITY
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
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Reported by: {selectedReport.reportedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Time: {selectedReport.reportedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
                      <div className="text-sm text-gray-600">
                        <p>Coordinates: {selectedReport.lat}, {selectedReport.lng}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Reporter
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Map
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
