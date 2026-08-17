import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import ContactBook from './ContactBook';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Sign In Screen Pathway */}
          <Route path="/login" element={<Login />} />
          
          {/* Secure Protected Dashboard Workspace */}
          <Route 
            path="/contacts" 
            element={
              <ProtectedRoute>
                <ContactBook />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirects any unknown pathways back into your contacts page */}
          <Route path="*" element={<Navigate to="/contacts" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
