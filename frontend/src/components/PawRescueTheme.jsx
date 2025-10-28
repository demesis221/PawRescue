import React from 'react';
import { MapPin, PawPrint, Camera, Bell, Heart, Phone, Mail } from 'lucide-react';

export default function PawRescueTheme() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Top bar */}
      <div className="bg-[#00273C] text-white text-sm py-2">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <div>Open Hours: Mon - Sat | 8:00am - 6:00pm</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +63 900 000 0000</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@pawrescue.app</div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF7A00] rounded-full p-2 text-white"><PawPrint className="w-6 h-6" /></div>
            <div>
              <h1 className="text-2xl font-bold">PawRescue</h1>
              <p className="text-xs text-gray-500">Community Stray Animal Reporting</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-[#FF7A00]">Home</a>
            <a href="#report" className="hover:text-[#FF7A00]">Report</a>
            <a href="#map" className="hover:text-[#FF7A00]">Map</a>
            <a href="#dashboard" className="hover:text-[#FF7A00]">Dashboard</a>
            <button className="bg-[#FF7A00] text-white px-4 py-2 rounded-md">Login</button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b6b0fbb6a4e5b3f9a9b7f3f278e4f1a')] bg-cover bg-center">
        <div className="bg-gradient-to-r from-[#00273C]/80 to-transparent">
          <div className="max-w-6xl mx-auto px-4 py-28 text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Help Rescue Stray Animals in Your Community</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-200">Report sightings, coordinate with rescuers, and track statuses — all in one place.</p>
            <div className="mt-8 flex gap-4">
              <a href="#report" className="bg-[#FF7A00] px-6 py-3 rounded-md font-semibold">Report a Stray</a>
              <a href="#map" className="bg-white text-[#00273C] px-6 py-3 rounded-md font-medium">View Map</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF4ED] text-[#FF7A00] mx-auto mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">Pin Location</h3>
              <p className="text-sm text-gray-600 mt-2">Easily mark where the animal was seen using the map picker.</p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF4ED] text-[#FF7A00] mx-auto mb-4">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">Upload Photo</h3>
              <p className="text-sm text-gray-600 mt-2">Attach clear photos to help rescuers quickly identify and locate the animal.</p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF4ED] text-[#FF7A00] mx-auto mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">Coordinate Rescue</h3>
              <p className="text-sm text-gray-600 mt-2">Notifications sent to rescuers and officials so help arrives fast.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reports + Map Preview */}
      <section id="map" className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Recent Reports</h3>
            <div className="space-y-4">
              <article className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
                <img src="https://placekitten.com/320/200" className="w-32 h-24 object-cover rounded-md" alt="report" />
                <div>
                  <h4 className="font-semibold">Small brown dog near JY Square</h4>
                  <p className="text-xs text-gray-500">Barangay Lahug, Cebu City · Still Stray</p>
                </div>
              </article>

              <article className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
                <img src="https://placekitten.com/321/200" className="w-32 h-24 object-cover rounded-md" alt="report" />
                <div>
                  <h4 className="font-semibold">White cat rescued</h4>
                  <p className="text-xs text-gray-500">Barangay Guadalupe, Cebu City · Rescued</p>
                </div>
              </article>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg h-72 border flex items-center justify-center text-gray-400">Map Placeholder</div>
            <div className="mt-4 text-sm text-gray-600">Interactive map will appear here. Click a marker to view details and update status.</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-[#FF7A00] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold">See a Stray? Report it Now.</h3>
          <p className="mt-2 text-sm opacity-90">Help the community care for animals — your report could save a life.</p>
          <div className="mt-6">
            <a href="#report" className="bg-white text-[#FF7A00] px-6 py-3 rounded-md font-semibold">Report a Stray</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00273C] text-white py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-lg">PawRescue</h4>
            <p className="text-sm text-gray-200 mt-2">Community-driven platform to report and rescue stray animals in your area.</p>
          </div>
          <div>
            <h5 className="font-semibold">Quick Links</h5>
            <ul className="mt-2 text-sm text-gray-200 space-y-1">
              <li>Home</li>
              <li>Report</li>
              <li>Map</li>
              <li>Dashboard</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Contact</h5>
            <p className="text-sm text-gray-200 mt-2">support@pawrescue.app</p>
            <p className="text-sm text-gray-200">+63 900 000 0000</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">© 2025 PawRescue. All rights reserved.</div>
      </footer>
    </div>
  );
}