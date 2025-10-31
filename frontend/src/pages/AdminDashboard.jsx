import { useState, useEffect } from 'react';
import { Users, FileCheck, TrendingUp, PawPrint, AlertTriangle, Clock, CheckCircle, Heart, Eye, Edit, Trash2, Filter, Search, Calendar, MapPin, Phone, Mail, Shield, Award, BarChart3, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import InfoModal from '../components/InfoModal';
import ReportDetailModal from '../components/ReportDetailModal';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReports: 0,
    rescued: 0,
    adopted: 0,
    pending: 0,
    inProgress: 0,
    totalUsers: 2341,
    activeRescuers: 45,
    officials: 8,
    successRate: 0
  });

  // Fetch reports from backend
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports');
      const result = await response.json();
      
      if (result.success) {
        setReports(result.data);
        
        const totalReports = result.data.length;
        const rescued = result.data.filter(r => r.status === 'rescued').length;
        const adopted = result.data.filter(r => r.status === 'adopted').length;
        const pending = result.data.filter(r => r.status === 'reported').length;
        const inProgress = result.data.filter(r => r.status === 'in_progress').length;
        const successRate = totalReports > 0 ? Math.round(((rescued + adopted) / totalReports) * 100) : 0;
        
        setStats(prev => ({
          ...prev,
          totalReports,
          rescued,
          adopted,
          pending,
          inProgress,
          successRate
        }));
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const recentReports = reports.map(report => ({
    id: report.id,
    type: report.animal_type,
    breed: report.breed || 'Unknown',
    location: report.location_name,
    status: report.status,
    reportedBy: 'User',
    reportedAt: new Date(report.created_at).toLocaleString(),
    urgency: report.urgency,
    image: report.image_urls && report.image_urls.length > 0 ? report.image_urls[0] : 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop'
  }));

  const users = [
    { id: 1, name: 'Maria Santos', role: 'rescuer', email: 'maria@example.com', reports: 23, joined: '2023-06-15' },
    { id: 2, name: 'John Doe', role: 'user', email: 'john@example.com', reports: 8, joined: '2023-08-20' },
    { id: 3, name: 'Lisa Chen', role: 'official', email: 'lisa@example.com', reports: 45, joined: '2023-03-10' },
    { id: 4, name: 'Alex Rivera', role: 'rescuer', email: 'alex@example.com', reports: 31, joined: '2023-05-22' }
  ];

  const statusColors = {
    reported: 'bg-orange-500',
    pending: 'bg-orange-500',
    in_progress: 'bg-purple-500',
    rescued: 'bg-green-500',
    adopted: 'bg-blue-500'
  };

  const roleColors = {
    user: 'bg-gray-100 text-gray-800',
    rescuer: 'bg-orange-100 text-orange-800',
    official: 'bg-blue-100 text-blue-800'
  };

  const filteredReports = recentReports.filter(report => 
    filterStatus === 'all' || report.status === filterStatus
  );

  const handleViewReport = (reportId) => {
    const report = recentReports.find(r => r.id === reportId);
    setSelectedReport(report);
  };

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', title: '', message: '', details: null, onConfirm: null });

  const handleDeleteReport = (reportId) => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Report?',
      message: 'This action cannot be undone. The report will be permanently removed.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        setModalConfig({ ...modalConfig, isOpen: false });
        performDelete(reportId);
      }
    });
  };

  const performDelete = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (response.ok && result.success) {
        setModalConfig({ isOpen: true, type: 'success', title: 'Report Deleted', message: 'The report has been successfully removed' });
        await fetchReports();
      } else {
        setModalConfig({ isOpen: true, type: 'error', title: 'Delete Failed', message: result.message || 'Unknown error' });
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      setModalConfig({ isOpen: true, type: 'error', title: 'Error', message: 'Failed to delete report. Please try again.' });
    }
  };

  const handleUpdateStatus = async (reportId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await response.json();
      
      if (result.success) {
        setModalConfig({ isOpen: true, type: 'success', title: 'Status Updated', message: `Report status changed to ${newStatus.replace('_', ' ')}` });
        fetchReports();
      } else {
        setModalConfig({ isOpen: true, type: 'error', title: 'Update Failed', message: result.message });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setModalConfig({ isOpen: true, type: 'error', title: 'Error', message: 'Failed to update status. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00273C] to-[#2C6975] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-200">Manage rescue operations and monitor system performance</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-xl">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'reports', label: 'Reports', icon: FileCheck },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: Activity }
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Overview */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">System Overview</h2>
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: 50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Total Users</p>
                      <p className="text-sm text-gray-600">Active community members</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{stats.totalUsers}</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-teal-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Active Rescuers</p>
                      <p className="text-sm text-gray-600">Verified rescue volunteers</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-teal-600">{stats.activeRescuers}</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Officials</p>
                      <p className="text-sm text-gray-600">Government partners</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{stats.officials}</p>
                </motion.div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Reports</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.totalReports}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <PawPrint className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Rescued</p>
                      <p className="text-3xl font-bold text-green-600">{stats.rescued}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Adopted</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.adopted}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Pending</p>
                      <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                      <p className="text-3xl font-bold text-purple-600">{stats.successRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Charts and Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="font-bold text-xl mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentReports.slice(0, 5).map((report, index) => (
                    <motion.div 
                      key={report.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <img 
                        src={report.image} 
                        alt={report.type}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 capitalize">
                          {report.breed} {report.type} in {report.location}
                        </p>
                        <p className="text-sm text-gray-600">Reported by {report.reportedBy}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[report.status]}`}>
                        {report.status.replace('_', ' ')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-xl mb-6">System Overview</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-orange-600" />
                      <div>
                        <p className="font-semibold text-gray-800">Total Users</p>
                        <p className="text-sm text-gray-600">Active community members</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{stats.totalUsers}</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-teal-600" />
                      <div>
                        <p className="font-semibold text-gray-800">Active Rescuers</p>
                        <p className="text-sm text-gray-600">Verified rescue volunteers</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-teal-600">{stats.activeRescuers}</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-800">Officials</p>
                        <p className="text-sm text-gray-600">Government partners</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{stats.officials}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Manage Reports</h2>
              <div className="flex items-center gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="reported">Reported</option>
                  <option value="in_progress">In Progress</option>
                  <option value="rescued">Rescued</option>
                  <option value="adopted">Adopted</option>
                </select>
              </div>
            </div>
            
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full object-cover" src={report.image} alt="" />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 capitalize">{report.breed}</div>
                              <div className="text-sm text-gray-500 capitalize">{report.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.reportedBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${statusColors[report.status]}`}>
                            {report.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.reportedAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleViewReport(report.id)} className="text-orange-600 hover:text-orange-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleUpdateStatus(report.id, 'in_progress')} className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteReport(report.id)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600">
                Add New User
              </Button>
            </div>
            
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColors[user.role]}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.reports}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.joined}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button onClick={() => alert('View user details')} className="text-orange-600 hover:text-orange-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => alert('Edit user')} className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => alert('Delete user')} className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        <ReportDetailModal 
          isOpen={!!selectedReport} 
          onClose={() => setSelectedReport(null)} 
          report={selectedReport}
          onStatusChange={handleUpdateStatus}
        />

        <InfoModal 
          isOpen={modalConfig.isOpen} 
          onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} 
          type={modalConfig.type}
          title={modalConfig.title}
          message={modalConfig.message}
          details={modalConfig.details}
          onConfirm={modalConfig.onConfirm}
          confirmText={modalConfig.confirmText}
          cancelText={modalConfig.cancelText}
        />

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Monthly Performance</h3>
                <div className="h-64 bg-gradient-to-br from-orange-50 to-teal-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chart visualization coming soon</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Success Rate Trends</h3>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Trend analysis coming soon</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
