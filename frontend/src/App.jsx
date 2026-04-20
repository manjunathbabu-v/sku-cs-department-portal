import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import StudentDashboard from './components/dashboard/StudentDashboard';
import StaffDashboard from './components/dashboard/StaffDashboard';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import Faculty from './components/Faculty';
import Courses from './components/Courses';

const DashboardRouter = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log('DashboardRouter mounted with role:', user?.role);
  }, [user]);

  if (!user) return null;

  return user.role.toLowerCase() === 'student' ? <StudentDashboard /> : <StaffDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-vh-100 bg-light">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/courses" element={<Courses />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
