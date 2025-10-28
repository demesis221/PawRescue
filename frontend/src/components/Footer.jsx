import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#00273C] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold text-lg">PawRescue</h4>
          <p className="text-sm text-gray-300 mt-2">Community-driven platform to report and rescue stray animals in your area.</p>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Quick Links</h5>
          <ul className="text-sm text-gray-300 space-y-1">
            <li><Link to="/" className="hover:text-[#FF7A00]">Home</Link></li>
            <li><Link to="/report" className="hover:text-[#FF7A00]">Report</Link></li>
            <li><Link to="/map" className="hover:text-[#FF7A00]">Map</Link></li>
            <li><Link to="/dashboard" className="hover:text-[#FF7A00]">Dashboard</Link></li>
            <li><Link to="/about" className="hover:text-[#FF7A00]">About</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Contact</h5>
          <div className="text-sm text-gray-300 space-y-2">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@pawrescue.app</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +63 900 000 0000</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">© 2025 PawRescue. All rights reserved.</div>
    </footer>
  );
}
