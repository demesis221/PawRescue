import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Filter, Search, Clock, Heart, AlertTriangle, CheckCircle, Eye, Calendar, Phone, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { reports, subscriptions } from '../lib/supabase';

function MapController({ center, zoom, openMarkerId, markers }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 15, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);

  useEffect(() => {
    if (openMarkerId && markers[openMarkerId]) {
      setTimeout(() => {
        console.log('Opening popup for:', openMarkerId);
        markers[openMarkerId].openPopup();
      }, 800);
    } else if (openMarkerId) {
      console.log('Marker not found for:', openMarkerId, 'Available:', Object.keys(markers));
    }
  }, [openMarkerId, markers]);

  return null;
}

export default function MapView() {
  const [filter, setFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportsList, setReportsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([10.3157, 123.8854]);
  const [mapZoom, setMapZoom] = useState(13);
  const [openMarkerId, setOpenMarkerId] = useState(null);
  const markerRefs = useRef({});

  useEffect(() => {
    loadReports();
    
    const channel = subscriptions.subscribeToReports(() => {
      loadReports();
    });
    
    return () => subscriptions.unsubscribe(channel);
  }, []);

  const loadReports = async () => {
    setLoading(true);
    const { data, error } = await reports.getAll();
    if (!error && data) {
      setReportsList(data);
    }
    setLoading(false);
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

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

  const getMarkerIcon = (urgency) => {
    const color = urgency === 'high' ? '#ef4444' : urgency === 'medium' ? '#eab308' : '#22c55e';
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="position: relative; background-color: ${color}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="width: 10px; height: 10px; background-color: white; border-radius: 50%;"></div></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
  };

  const filteredReports = reportsList.filter(report => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = report.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.animal_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (report.breed && report.breed.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: reportsList.length,
    reported: reportsList.filter(r => r.status === 'reported').length,
    rescued: reportsList.filter(r => r.status === 'rescued').length,
    adopted: reportsList.filter(r => r.status === 'adopted').length,
    in_progress: reportsList.filter(r => r.status === 'in_progress').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading rescue map...</p>
        </div>
      </div>
    );
  }

  console.log('Reports loaded:', reportsList.length);
  console.log('Filtered reports:', filteredReports.length);

  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Urgency Levels</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Normal</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="h-[650px] overflow-hidden">
              <MapContainer center={[10.3157, 123.8854]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <MapController center={mapCenter} zoom={mapZoom} openMarkerId={openMarkerId} markers={markerRefs.current} />
                {filteredReports.map(report => (
                  <Marker 
                    key={report.id} 
                    position={[report.latitude, report.longitude]} 
                    icon={getMarkerIcon(report.urgency)}
                    eventHandlers={{
                      add: (e) => {
                        markerRefs.current[report.id] = e.target;
                      }
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        {report.image_urls && report.image_urls[0] && (
                          <img src={report.image_urls[0]} alt={report.breed || report.animal_type} className="w-full h-32 object-cover rounded-lg mb-2" />
                        )}
                        <h3 className="font-bold text-lg mb-1 capitalize">{report.breed || report.animal_type}</h3>
                        <p className="text-sm text-gray-600 mb-2">{report.location_name}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[report.status]}`}>
                            {report.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{report.description}</p>
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="w-full bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl">Active Reports</h3>
              <span className="text-sm text-gray-500">{filteredReports.length} results</span>
            </div>
            <div className="max-h-[700px] overflow-y-auto space-y-3">
              {filteredReports.length === 0 && (
                <Card className="p-8 text-center">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-700 mb-2">No Reports Found</h3>
                  <p className="text-sm text-gray-500">Submit a report to see it on the map</p>
                </Card>
              )}
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
                      className={`cursor-pointer border-l-4 ${urgencyColors[report.urgency]} transition-all duration-200 hover:shadow-lg`} 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Clicking card for report:', report.id);
                        console.log('Coordinates:', report.latitude, report.longitude);
                        setMapCenter([report.latitude, report.longitude]);
                        setMapZoom(17);
                        setTimeout(() => setOpenMarkerId(report.id), 100);
                      }}
                    >
                      <div className="flex gap-4">
                        {report.image_urls && report.image_urls[0] ? (
                          <img 
                            src={report.image_urls[0]} 
                            alt={`${report.animal_type} in ${report.location_name}`}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-800 capitalize truncate">
                              {report.breed || report.animal_type}
                            </h4>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${statusColors[report.status]}`}>
                              <StatusIcon className="w-3 h-3" />
                              <span className="capitalize">{report.status.replace('_', ' ')}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{report.description}</p>
                          <div className="flex flex-col gap-1 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{report.location_name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span className="whitespace-nowrap">{formatTimeAgo(report.created_at)}</span>
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

        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="relative">
                {selectedReport.image_urls && selectedReport.image_urls[0] ? (
                  <img 
                    src={selectedReport.image_urls[0]} 
                    alt={`${selectedReport.animal_type} in ${selectedReport.location_name}`}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-t-2xl flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-gray-400" />
                  </div>
                )}
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
                      {selectedReport.breed || selectedReport.animal_type}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedReport.location_name}</span>
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
                          <span className="text-gray-600">Reported by: {selectedReport.profiles?.full_name || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Time: {formatTimeAgo(selectedReport.created_at)}</span>
                        </div>
                        {selectedReport.contact_phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{selectedReport.contact_phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
                      <div className="text-sm text-gray-600">
                        <p>Coordinates: {selectedReport.latitude}, {selectedReport.longitude}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    {selectedReport.contact_phone && (
                      <Button 
                        onClick={() => window.location.href = `tel:${selectedReport.contact_phone}`}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Reporter
                      </Button>
                    )}
                    <Button 
                      onClick={() => window.open(`https://www.google.com/maps?q=${selectedReport.latitude},${selectedReport.longitude}`, '_blank')}
                      className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                    >
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
