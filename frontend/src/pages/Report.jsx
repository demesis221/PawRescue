import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Camera, MapPin, Upload, AlertTriangle, Clock, Phone, CheckCircle, Info, Maximize, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';

export default function Report() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [formData, setFormData] = useState({
    animalType: '',
    urgency: '',
    description: '',
    location: '',
    contactName: '',
    contactPhone: '',
    image: null,
    condition: '',
    coordinates: [10.3157, 123.8854]
  });

  function LocationMarker() {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        setFormData({ ...formData, coordinates: [lat, lng] });
        
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await response.json();
          const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          setFormData(prev => ({ ...prev, location: address, coordinates: [lat, lng] }));
        } catch (error) {
          setFormData(prev => ({ ...prev, location: `${lat.toFixed(6)}, ${lng.toFixed(6)}`, coordinates: [lat, lng] }));
        }
      },
    });
    return <Marker position={formData.coordinates} />;
  }
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setTimeout(() => {
      setFormData({ 
        animalType: '', urgency: '', description: '', location: '', 
        contactName: '', contactPhone: '', image: null, condition: '' 
      });
      setCurrentStep(1);
      setShowModal(false);
    }, 3000);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Report a Stray Animal</h1>
            <p className="text-xl text-orange-100 mb-6">Help us save a life - every report matters</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Average response: 15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Emergency: +63 900 000 0000</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        {/* Progress Steps */}
        <Card className="mb-8">
          <div className="flex items-center justify-between p-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 mx-4 ${
                    currentStep > step ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-6 pb-4 text-sm">
            <span className={currentStep >= 1 ? 'text-orange-600 font-semibold' : 'text-gray-500'}>Animal Details</span>
            <span className={currentStep >= 2 ? 'text-orange-600 font-semibold' : 'text-gray-500'}>Location & Photo</span>
            <span className={currentStep >= 3 ? 'text-orange-600 font-semibold' : 'text-gray-500'}>Contact Info</span>
          </div>
        </Card>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Animal Details */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="mb-6">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Info className="w-6 h-6 text-orange-500" />
                    Tell us about the animal
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3">Animal Type *</label>
                      <select
                        required
                        value={formData.animalType}
                        onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Select animal type</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="puppy">Puppy</option>
                        <option value="kitten">Kitten</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3">Urgency Level *</label>
                      <select
                        required
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Select urgency</option>
                        <option value="critical">🔴 Critical - Injured/Sick</option>
                        <option value="high">🟡 High - Distressed</option>
                        <option value="normal">🟢 Normal - Healthy but stray</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold mb-3">Animal Condition *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Healthy', 'Injured', 'Sick', 'Malnourished'].map((condition) => (
                        <label key={condition} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="condition"
                            value={condition.toLowerCase()}
                            checked={formData.condition === condition.toLowerCase()}
                            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                            className="text-orange-500"
                            required
                          />
                          <span className="text-sm">{condition}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold mb-3">Description *</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the animal: color, size, breed, behavior, any visible injuries..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Location & Photo */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="mb-6">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-orange-500" />
                    Location & Photo
                  </h2>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-3">Location *</label>
                    <input
                      required
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Enter specific address, landmark, or area description"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <p className="text-sm text-gray-500 mt-2">Be as specific as possible to help rescuers find the animal quickly</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold">Pin Location on Map</label>
                      <button
                        type="button"
                        onClick={() => setIsMapFullscreen(true)}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                      >
                        <Maximize className="w-4 h-4" />
                        Fullscreen
                      </button>
                    </div>
                    <div className="rounded-xl overflow-hidden border-2 border-gray-300" style={{ height: '400px' }}>
                      <MapContainer center={formData.coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <LocationMarker />
                      </MapContainer>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Click on the map to pin the exact location</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                      <Camera className="w-4 h-4" /> Upload Photo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-500 transition-colors cursor-pointer bg-gray-50 hover:bg-orange-50">
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="font-semibold text-gray-700 mb-2">Upload a clear photo</h3>
                      <p className="text-sm text-gray-600 mb-4">Help rescuers identify the animal quickly</p>
                      <button type="button" className="btn-primary text-sm px-6 py-2">
                        Choose File
                      </button>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} 
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Contact Info */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="mb-6">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Phone className="w-6 h-6 text-orange-500" />
                    Contact Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3">Your Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Why we need your contact info:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Updates on rescue progress</li>
                          <li>• Clarification if needed</li>
                          <li>• Follow-up on animal's condition</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <Card>
            <div className="p-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  currentStep === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary px-8 py-3"
                >
                  Next Step
                </button>
              ) : (
                <button type="submit" className="btn-primary px-8 py-3">
                  Submit Report
                </button>
              )}
            </div>
          </Card>
        </form>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Report Submitted Successfully!">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Thank you for reporting! Our rescue team has been notified and will respond as quickly as possible.</p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-700">Expected response time: 15-30 minutes</p>
          </div>
        </div>
      </Modal>

      {/* Fullscreen Map Modal */}
      {isMapFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full h-full max-w-7xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold">Select Location on Map</h3>
              <button
                onClick={() => setIsMapFullscreen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div style={{ height: 'calc(100% - 64px)' }}>
              <MapContainer center={formData.coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <LocationMarker />
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
