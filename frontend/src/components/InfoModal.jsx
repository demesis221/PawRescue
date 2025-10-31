import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function InfoModal({ isOpen, onClose, type = 'success', title, message, details, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel' }) {
  if (!isOpen) return null;

  const config = {
    success: {
      icon: CheckCircle,
      gradient: 'from-green-500 to-teal-500',
      iconBg: 'text-green-500'
    },
    error: {
      icon: AlertTriangle,
      gradient: 'from-red-500 to-orange-500',
      iconBg: 'text-red-500'
    },
    info: {
      icon: Info,
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'text-blue-500'
    },
    confirm: {
      icon: AlertTriangle,
      gradient: 'from-red-500 to-red-600',
      iconBg: 'text-red-500'
    }
  };

  const { icon: Icon, gradient, iconBg } = config[type];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-r ${gradient} p-6 text-white text-center`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon className={`w-10 h-10 ${iconBg}`} />
            </div>
          </motion.div>
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          {message && <p className="text-white/90 text-sm">{message}</p>}
        </div>

        <div className="p-6">
          {details && <div className="text-gray-700 mb-4">{details}</div>}
          
          {type === 'confirm' ? (
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  if (onConfirm) {
                    onConfirm();
                  }
                }}
                className={`flex-1 px-6 py-3 bg-gradient-to-r ${gradient} text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg`}
              >
                {confirmText}
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className={`w-full bg-gradient-to-r ${gradient} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl`}
            >
              Close
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
