import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, AlertTriangle, User, Phone } from 'lucide-react';

export default function ReportDetailModal({ isOpen, onClose, report, onStatusChange }) {
  if (!report) return null;

  const urgencyColors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-green-100 text-green-800 border-green-300'
  };

  const statusColors = {
    reported: 'bg-orange-500',
    in_progress: 'bg-purple-500',
    rescued: 'bg-green-500',
    adopted: 'bg-blue-500'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header with Image */}
              <div className="relative h-64 bg-gradient-to-br from-orange-400 to-teal-500">
                <img 
                  src={report.image} 
                  alt={report.type}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${urgencyColors[report.urgency]}`}>
                      {report.urgency.toUpperCase()} URGENCY
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors[report.status]}`}>
                      {report.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white capitalize">
                    {report.breed} {report.type}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">LOCATION</p>
                      <p className="text-sm text-gray-800">{report.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">REPORTED</p>
                      <p className="text-sm text-gray-800">{report.reportedAt}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">REPORTED BY</p>
                      <p className="text-sm text-gray-800">{report.reportedBy}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">URGENCY LEVEL</p>
                      <p className="text-sm text-gray-800 capitalize font-semibold">{report.urgency}</p>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="border-t pt-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Update Status</label>
                  <div className="flex gap-2">
                    {['reported', 'in_progress', 'rescued', 'adopted'].map(status => (
                      <button
                        key={status}
                        onClick={() => {
                          onStatusChange(report.id, status);
                          onClose();
                        }}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                          report.status === status
                            ? `${statusColors[status]} text-white`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                  >
                    Close
                  </button>
                  <button
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition shadow-lg"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
