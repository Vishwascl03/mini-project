import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CanvasPage from './pages/CanvasPage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  const { isAuthenticated } = useAuthStore();
  
  // Set page title
  useEffect(() => {
    document.title = 'Artistry - Collaborative Art Platform';
  }, []);
  
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          
          <Route 
            path="/canvas/new" 
            element={
              <ProtectedRoute>
                <CanvasPage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/canvas/:id" element={<CanvasPage />} />
          
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} 
          />
          
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;