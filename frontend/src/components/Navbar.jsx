import { Link } from 'react-router-dom';
import { PawPrint, Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-3 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <PawPrint className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
              PawRescue
            </h1>
            <p className="text-xs text-gray-500 font-medium">Saving Lives Together</p>
          </div>
        </Link>

        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <nav className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex items-center gap-8 absolute md:relative top-full left-0 w-full md:w-auto bg-white/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 shadow-lg md:shadow-none border-t md:border-t-0 border-gray-100`}>
          <Link 
            to="/" 
            className="block md:inline font-medium text-gray-700 hover:text-orange-600 py-2 md:py-0 transition-colors duration-200 hover:scale-105"
          >
            Home
          </Link>
          <Link 
            to="/report" 
            className="block md:inline font-medium text-gray-700 hover:text-orange-600 py-2 md:py-0 transition-colors duration-200 hover:scale-105"
          >
            Report Stray
          </Link>
          <Link 
            to="/map" 
            className="block md:inline font-medium text-gray-700 hover:text-orange-600 py-2 md:py-0 transition-colors duration-200 hover:scale-105"
          >
            Rescue Map
          </Link>
          <Link 
            to="/dashboard" 
            className="block md:inline font-medium text-gray-700 hover:text-orange-600 py-2 md:py-0 transition-colors duration-200 hover:scale-105"
          >
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className="block md:inline font-medium text-gray-700 hover:text-orange-600 py-2 md:py-0 transition-colors duration-200 hover:scale-105"
          >
            About
          </Link>
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <a 
              href="tel:+639000000000" 
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
            >
              <Phone className="w-4 h-4" />
              Emergency
            </a>
            <button className="btn-primary text-sm px-6 py-2">
              Login
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
