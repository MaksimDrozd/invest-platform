import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Market from './components/Market';
import Watchlist from './components/Watchlist';
import Wallet from './components/Wallet';
import TransactionHistory from './components/TransactionHistory';
import FundDiscovery from './components/FundDiscovery';
import DepositPage from './components/DepositPage';
import { container } from './di/container';
import { TYPES } from './di/types';
import { AuthService } from './services/AuthService';
import type { User } from './types';
import React from 'react';

const News = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">News</h1>
    <p>News page coming soon...</p>
  </div>
);

// Landing page wrapper - no longer needs to track user state
const LandingWrapper = () => {
  return <LandingPage />;
};

// Wrapper component for handling login with navigation
const LoginWrapper = ({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) => {
  const navigate = useNavigate();
  
  const handleLoginWithRedirect = async (email: string, password: string) => {
    await onLogin(email, password);
    navigate('/app/dashboard');
  };

  return <LoginPage onLogin={handleLoginWithRedirect} />;
};

// Protected Route Wrapper
const ProtectedRoute = ({ 
  user, 
  children 
}: { 
  user: User | null; 
  children: React.ReactNode;
}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      {children}
    </Layout>
  );
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const authService = container.get<AuthService>(TYPES.AuthService);

  useEffect(() => {
    // Check if user is already authenticated
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, [authService]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to handle in LoginPage
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingWrapper />} />
      <Route path="/landing" element={<LandingWrapper />} />
      <Route path="/login" element={<LoginWrapper onLogin={handleLogin} />} />
      
      {/* Protected routes */}
      <Route path="/app/dashboard" element={
        <ProtectedRoute user={user}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/app/portfolio" element={
        <ProtectedRoute user={user}>
          <Portfolio />
        </ProtectedRoute>
      } />
      <Route path="/app/market" element={
        <ProtectedRoute user={user}>
          <Market />
        </ProtectedRoute>
      } />
      <Route path="/app/watchlist" element={
        <ProtectedRoute user={user}>
          <Watchlist />
        </ProtectedRoute>
      } />
      <Route path="/app/wallet" element={
        <ProtectedRoute user={user}>
          <Wallet />
        </ProtectedRoute>
      } />
      <Route path="/app/wallet/withdrawal" element={
        <ProtectedRoute user={user}>
          <Wallet />
        </ProtectedRoute>
      } />
      <Route path="/app/transactions" element={
        <ProtectedRoute user={user}>
          <TransactionHistory />
        </ProtectedRoute>
      } />
      <Route path="/app/news" element={
        <ProtectedRoute user={user}>
          <News />
        </ProtectedRoute>
      } />
      <Route path="/app/funds" element={
        <ProtectedRoute user={user}>
          <FundDiscovery />
        </ProtectedRoute>
      } />
      <Route path="/app/deposit" element={
        <ProtectedRoute user={user}>
          <DepositPage />
        </ProtectedRoute>
      } />
      
      {/* Redirect /app to /app/dashboard */}
      <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
      
      {/* Catch all other routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
