import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Report from './pages/Report';
import MapView from './pages/MapView';
import RescuerDashboard from './pages/RescuerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import TestConnection from './pages/TestConnection';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/dashboard" element={<RescuerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test-connection" element={<TestConnection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App