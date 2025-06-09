import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  Shield,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Filter,
  ExternalLink,
  Database,
  Wallet as WalletIcon,
  LogOut,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { AuthService } from '../services/AuthService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const authService = container.get<AuthService>(TYPES.AuthService);
  const [filters, setFilters] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  // Mock data for demo
  const topLevelKPIs = [
    {
      title: 'Total AUM:',
      value: '$27,450,892',
      icon: DollarSign,
      change: '+12.3%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Users:',
      value: '8,421',
      icon: Users,
      change: '+8.1%',
      changeType: 'positive' as const
    },
    {
      title: 'Pending KYC reviews:',
      value: '43',
      icon: Shield,
      change: '+2',
      changeType: 'neutral' as const
    },
    {
      title: 'Fund applications:',
      value: '12 New',
      icon: FileText,
      change: '+4',
      changeType: 'positive' as const
    },
    {
      title: 'Total revenue (30d):',
      value: '$182,130',
      icon: TrendingUp,
      change: '+15.2%',
      changeType: 'positive' as const
    },
    {
      title: 'Transaction volume (24h):',
      value: '$4.2M',
      icon: Activity,
      change: '+23.1%',
      changeType: 'positive' as const
    }
  ];

  const liveActivity = [
    {
      time: '10:45',
      event: 'JohnDoe123 has verified',
      icon: CheckCircle,
      type: 'verification'
    },
    {
      time: '10:39',
      event: 'New support ticket',
      icon: MessageSquare,
      type: 'support'
    },
    {
      time: '10:32',
      event: 'High withdrawal volume from Fund A',
      icon: AlertTriangle,
      type: 'alert'
    },
    {
      time: '10:28',
      event: 'Partner submitted fund update',
      icon: FileText,
      type: 'update'
    }
  ];

  const fundPerformance = [
    {
      fundName: 'Halogen Digital',
      roi: '+14.2%',
      tvl: '$5.8M',
      riskLevel: 'Medium',
      status: 'Active'
    },
    {
      fundName: 'Aurora Growth',
      roi: '+28.6%',
      tvl: '$3.1M',
      riskLevel: 'High',
      status: 'Active'
    },
    {
      fundName: 'Green Stable Fund',
      roi: '+6.2%',
      tvl: '$4.4M',
      riskLevel: 'Low',
      status: 'Active'
    },
    {
      fundName: 'Real World Assets',
      roi: '-2.4%',
      tvl: '$1.7M',
      riskLevel: 'Medium',
      status: 'Warning'
    }
  ];

  const kycStatus = [
    { status: 'Verified', count: 12308, icon: CheckCircle },
    { status: 'Pending', count: 43, icon: Clock },
    { status: 'Rejected', count: 16, icon: XCircle },
    { status: 'Needs Review', count: 5, icon: AlertCircle }
  ];

  const systemHealth = [
    { component: 'Exchange APIs', status: 'OK', icon: TrendingUp },
    { component: 'Fireblocks Wallet', status: 'OK', icon: WalletIcon },
    { component: 'Elliptic (KYC)', status: 'Slow', icon: Shield },
    { component: 'DB Queries', status: 'OK', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">AdminPanel</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h5l-5-5v5z" />
              </svg>
            </button>
            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-600" />
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {authService.getCurrentUser()?.firstName} {authService.getCurrentUser()?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{authService.getCurrentUser()?.email}</p>
                    <p className="text-xs text-blue-600 font-medium">Administrator</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      // Navigate to admin settings when implemented
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Admin Settings
                  </button>
                  
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-900 rounded-lg font-medium">
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Users className="w-5 h-5" />
              User management
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <TrendingUp className="w-5 h-5" />
              Portfolio & fund management
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5" />
              Fund applications
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <DollarSign className="w-5 h-5" />
              Financials
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5" />
              KYC & Compliance
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <MessageSquare className="w-5 h-5" />
              Support requests
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <BarChart3 className="w-5 h-5" />
              Marketing & Analytics
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
              Security
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Activity className="w-5 h-5" />
              Monitoring
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
          </div>

          {/* Top-level KPIs */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top-level KPIs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topLevelKPIs.map((kpi, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                    <kpi.icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      kpi.changeType === 'positive' ? 'bg-green-100 text-green-800' :
                      kpi.changeType === 'neutral' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed and Fund Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Live Activity Feed */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Live activity feed</h3>
                  <button
                    onClick={() => setFilters(!filters)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {liveActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <activity.icon className={`w-4 h-4 ${
                          activity.type === 'verification' ? 'text-green-500' :
                          activity.type === 'alert' ? 'text-red-500' :
                          activity.type === 'support' ? 'text-blue-500' :
                          'text-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">{activity.time}</span>
                          <span className="text-sm text-gray-900">{activity.event}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fund Performance */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Fund performance</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="text-sm font-medium text-gray-600 pb-3">Fund name</th>
                        <th className="text-sm font-medium text-gray-600 pb-3">ROI (30d)</th>
                        <th className="text-sm font-medium text-gray-600 pb-3">TVL</th>
                        <th className="text-sm font-medium text-gray-600 pb-3">Risk Level</th>
                        <th className="text-sm font-medium text-gray-600 pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      {fundPerformance.map((fund, index) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="py-3 text-sm font-medium text-gray-900">{fund.fundName}</td>
                          <td className={`py-3 text-sm font-medium ${
                            fund.roi.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {fund.roi}
                          </td>
                          <td className="py-3 text-sm text-gray-600">{fund.tvl}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              fund.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                              fund.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {fund.riskLevel}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              fund.status === 'Active' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {fund.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* KYC Status Overview and System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KYC Status Overview */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">KYC status overview</h3>
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">
                    <ExternalLink className="w-4 h-4" />
                    Go to KYC management
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {kycStatus.map((status, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <status.icon className={`w-5 h-5 ${
                          status.status === 'Verified' ? 'text-green-500' :
                          status.status === 'Pending' ? 'text-yellow-500' :
                          status.status === 'Rejected' ? 'text-red-500' :
                          'text-orange-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-900">{status.status}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{status.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">
                    <ExternalLink className="w-4 h-4" />
                    Go to Monitoring
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {systemHealth.map((component, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <component.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">{component.component}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          component.status === 'OK' ? 'bg-green-500' :
                          component.status === 'Slow' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          component.status === 'OK' ? 'text-green-600' :
                          component.status === 'Slow' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {component.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 