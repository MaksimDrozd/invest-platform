import { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  Search,
  X,
  Download,
  RefreshCw,
  UserX
} from 'lucide-react';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { AuthService } from '../services/AuthService';

type ActiveSection = 'dashboard' | 'user-management' | 'portfolio-management' | 'fund-applications' | 'financials' | 'kyc-compliance' | 'support-requests' | 'marketing-analytics' | 'security' | 'monitoring';

interface UserData {
  id: number;
  login: string;
  name: string;
  email: string;
  userId: string;
  type: string;
  kycStatus: string;
  risk: string;
  portfolio: string;
  status: string;
  registeredOn: string;
  wallet: string;
  totalInvested: string;
  currentPortfolio: string;
  roi: string;
  fundsJoined: number;
  kyc: {
    nationalId: string;
    selfie: string;
    proofOfAddress: string;
  };
  recentActivity: Array<{
    date: string;
    type: string;
    description: string;
  }>;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const authService = container.get<AuthService>(TYPES.AuthService);
  const [filters, setFilters] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [userModalOpen, setUserModalOpen] = useState(false);
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

  const handleViewUser = (user: UserData) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const closeUserModal = () => {
    setUserModalOpen(false);
    setSelectedUser(null);
  };

  // Mock data for user management
  const mockUsers = [
    {
      id: 1,
      login: 'JohnDoe123',
      name: 'John Doe',
      email: 'johndoe123@gmail.com',
      userId: 'A1B2C3D4',
      type: 'Individual',
      kycStatus: 'Verified',
      risk: 'Moderate',
      portfolio: '$12,430',
      status: 'Active',
      registeredOn: 'March 5, 2025',
      wallet: '0xF7A3...e94',
      totalInvested: '$10,200.00',
      currentPortfolio: '$11,540.42',
      roi: '+13.1%',
      fundsJoined: 3,
      kyc: {
        nationalId: 'Uploaded',
        selfie: 'Uploaded',
        proofOfAddress: 'Missing'
      },
      recentActivity: [
        { date: 'Apr 27', type: 'Login', description: 'IP: 192.168.14.22 — Chrome (RU)' },
        { date: 'Apr 26', type: 'Invested', description: '$500 in Aurora Yield Fund' },
        { date: 'Apr 25', type: 'Deposited', description: '$1,000 via USDT (Tron)' }
      ]
    },
    {
      id: 2,
      login: 'JaneSmith456',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      userId: 'B2C3D4E5',
      type: 'Individual',
      kycStatus: 'Pending',
      risk: 'Low',
      portfolio: '$8,240',
      status: 'Active',
      registeredOn: 'February 12, 2025',
      wallet: '0xA2B3...d85',
      totalInvested: '$8,000.00',
      currentPortfolio: '$8,240.00',
      roi: '+3.0%',
      fundsJoined: 2,
      kyc: {
        nationalId: 'Uploaded',
        selfie: 'Pending',
        proofOfAddress: 'Uploaded'
      },
      recentActivity: [
        { date: 'Apr 26', type: 'Login', description: 'IP: 10.0.0.1 — Safari (US)' },
        { date: 'Apr 24', type: 'Invested', description: '$2,000 in Green Fund' },
        { date: 'Apr 20', type: 'Deposited', description: '$8,000 via ETH' }
      ]
    },
    {
      id: 3,
      login: 'CorporateInvest',
      name: 'Corporate Invest LLC',
      email: 'info@corporateinvest.com',
      userId: 'C3D4E5F6',
      type: 'Corporate',
      kycStatus: 'Verified',
      risk: 'High',
      portfolio: '$45,680',
      status: 'Active',
      registeredOn: 'January 8, 2025',
      wallet: '0xC4D5...f96',
      totalInvested: '$40,000.00',
      currentPortfolio: '$45,680.00',
      roi: '+14.2%',
      fundsJoined: 5,
      kyc: {
        nationalId: 'Uploaded',
        selfie: 'N/A',
        proofOfAddress: 'Uploaded'
      },
      recentActivity: [
        { date: 'Apr 27', type: 'Invested', description: '$5,000 in Tech Innovation Fund' },
        { date: 'Apr 25', type: 'Login', description: 'IP: 203.45.67.89 — Firefox (UK)' },
        { date: 'Apr 23', type: 'Deposited', description: '$15,000 via BTC' }
      ]
    },
    {
      id: 4,
      login: 'AliceJohnson',
      name: 'Alice Johnson',
      email: 'alice.johnson@mail.com',
      userId: 'D4E5F6G7',
      type: 'Individual',
      kycStatus: 'Rejected',
      risk: 'Moderate',
      portfolio: '$0',
      status: 'Suspended',
      registeredOn: 'March 15, 2025',
      wallet: '0xD5E6...g07',
      totalInvested: '$0.00',
      currentPortfolio: '$0.00',
      roi: '0.0%',
      fundsJoined: 0,
      kyc: {
        nationalId: 'Rejected',
        selfie: 'Uploaded',
        proofOfAddress: 'Missing'
      },
      recentActivity: [
        { date: 'Mar 20', type: 'KYC Rejected', description: 'Invalid document format' },
        { date: 'Mar 18', type: 'Login', description: 'IP: 192.168.1.100 — Chrome (US)' },
        { date: 'Mar 15', type: 'Registered', description: 'Account created' }
      ]
    },
    {
      id: 5,
      login: 'BobWilson',
      name: 'Bob Wilson',
      email: 'bob.wilson@outlook.com',
      userId: 'E5F6G7H8',
      type: 'Individual',
      kycStatus: 'Verified',
      risk: 'Low',
      portfolio: '$23,150',
      status: 'Active',
      registeredOn: 'February 28, 2025',
      wallet: '0xE6F7...h18',
      totalInvested: '$22,000.00',
      currentPortfolio: '$23,150.00',
      roi: '+5.2%',
      fundsJoined: 3,
      kyc: {
        nationalId: 'Uploaded',
        selfie: 'Uploaded',
        proofOfAddress: 'Uploaded'
      },
      recentActivity: [
        { date: 'Apr 26', type: 'Login', description: 'IP: 172.16.0.1 — Edge (CA)' },
        { date: 'Apr 22', type: 'Invested', description: '$1,000 in Stable Income Fund' },
        { date: 'Apr 18', type: 'Deposited', description: '$5,000 via USDC' }
      ]
    },
    {
      id: 6,
      login: 'TechFund2024',
      name: 'Tech Fund 2024',
      email: 'contact@techfund2024.com',
      userId: 'F6G7H8I9',
      type: 'Corporate',
      kycStatus: 'Verified',
      risk: 'High',
      portfolio: '$78,920',
      status: 'Active',
      registeredOn: 'December 10, 2024',
      wallet: '0xF7G8...i29',
      totalInvested: '$75,000.00',
      currentPortfolio: '$78,920.00',
      roi: '+5.2%',
      fundsJoined: 4,
      kyc: {
        nationalId: 'Uploaded',
        selfie: 'N/A',
        proofOfAddress: 'Uploaded'
      },
      recentActivity: [
        { date: 'Apr 27', type: 'Invested', description: '$10,000 in AI Growth Fund' },
        { date: 'Apr 25', type: 'Login', description: 'IP: 198.51.100.1 — Chrome (DE)' },
        { date: 'Apr 21', type: 'Deposited', description: '$25,000 via ETH' }
      ]
    },
    {
      id: 7,
      login: 'SarahConnor',
      name: 'Sarah Connor',
      email: 'sarah.connor@resistance.com',
      userId: 'G7H8I9J0',
      type: 'Individual',
      kycStatus: 'Pending',
      risk: 'Moderate',
      portfolio: '$5,800',
      status: 'Active',
      registeredOn: 'March 22, 2025',
      wallet: '0xG8H9...j30',
      totalInvested: '$5,500.00',
      currentPortfolio: '$5,800.00',
      roi: '+5.5%',
      fundsJoined: 1,
      kyc: {
        nationalId: 'Pending',
        selfie: 'Uploaded',
        proofOfAddress: 'Uploaded'
      },
      recentActivity: [
        { date: 'Apr 26', type: 'Login', description: 'IP: 203.0.113.1 — Firefox (AU)' },
        { date: 'Apr 23', type: 'Invested', description: '$1,500 in Balanced Fund' },
        { date: 'Mar 22', type: 'Deposited', description: '$5,500 via BTC' }
      ]
    },
    {
      id: 8,
      login: 'GreenInvest',
      name: 'Green Invest Fund',
      email: 'admin@greeninvest.eco',
      userId: 'H8I9J0K1',
      type: 'Corporate',
      kycStatus: 'Verified',
      risk: 'Medium',
      portfolio: '$32,470',
      status: 'Active',
      registeredOn: 'January 18, 2025',
      wallet: '0xH9I0...k41',
      totalInvested: '$30,000.00',
      currentPortfolio: '$32,470.00',
      roi: '+8.2%',
      fundsJoined: 3,
      kyc: {
        nationalId: 'Uploaded',
        selfie: 'N/A',
        proofOfAddress: 'Uploaded'
      },
      recentActivity: [
        { date: 'Apr 27', type: 'Invested', description: '$3,000 in ESG Fund' },
        { date: 'Apr 24', type: 'Login', description: 'IP: 192.0.2.1 — Safari (NL)' },
        { date: 'Apr 20', type: 'Deposited', description: '$8,000 via USDT' }
      ]
    },
    {
      id: 9,
      login: 'MikeRoss',
      name: 'Mike Ross',
      email: 'mike.ross@lawyers.com',
      userId: 'I9J0K1L2',
      type: 'Individual',
      kycStatus: 'Verified',
      risk: 'Low',
      portfolio: '$17,890',
      status: 'Active',
      registeredOn: 'February 5, 2025',
      wallet: '0xI0J1...l52',
      totalInvested: '$17,000.00',
      currentPortfolio: '$17,890.00',
      roi: '+5.2%',
      fundsJoined: 2,
      kyc: {
        nationalId: 'Uploaded',
        selfie: 'Uploaded',
        proofOfAddress: 'Uploaded'
      },
      recentActivity: [
        { date: 'Apr 25', type: 'Login', description: 'IP: 198.18.0.1 — Chrome (US)' },
        { date: 'Apr 21', type: 'Invested', description: '$2,000 in Conservative Fund' },
        { date: 'Apr 15', type: 'Deposited', description: '$5,000 via ETH' }
      ]
    },
    {
      id: 10,
      login: 'QuantumCorp',
      name: 'Quantum Corp',
      email: 'info@quantumcorp.tech',
      userId: 'J0K1L2M3',
      type: 'Corporate',
      kycStatus: 'Verified',
      risk: 'High',
      portfolio: '$156,340',
      status: 'Active',
      registeredOn: 'November 30, 2024',
      wallet: '0xJ1K2...m63',
      totalInvested: '$150,000.00',
      currentPortfolio: '$156,340.00',
      roi: '+4.2%',
      fundsJoined: 6,
      kyc: {
        nationalId: 'Uploaded',
        selfie: 'N/A',
        proofOfAddress: 'Uploaded'
      },
      recentActivity: [
        { date: 'Apr 27', type: 'Invested', description: '$20,000 in Quantum Tech Fund' },
        { date: 'Apr 26', type: 'Login', description: 'IP: 203.113.0.1 — Firefox (JP)' },
        { date: 'Apr 22', type: 'Deposited', description: '$50,000 via BTC' }
      ]
    }
  ];

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

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    Login
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    Name  
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    Type
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    KYC status
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    Risk
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    Portfolio
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    Status
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.login}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                        user.kycStatus === 'Verified' ? 'bg-green-100 border-green-500' :
                        user.kycStatus === 'Pending' ? 'bg-yellow-100 border-yellow-500' :
                        'bg-red-100 border-red-500'
                      }`}>
                        {user.kycStatus === 'Verified' && (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        )}
                        {user.kycStatus === 'Pending' && (
                          <Clock className="w-3 h-3 text-yellow-600" />
                        )}
                        {user.kycStatus === 'Rejected' && (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                      <span className="text-sm text-gray-900">{user.kycStatus}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.risk}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.portfolio}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => handleViewUser(user)}
                      className="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      View full
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Viewed: 10 out of 1230
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                ‹
              </button>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 text-sm rounded-md ${
                      page === 1 ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-2 text-sm text-gray-500">...</span>
                <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  123
                </button>
              </div>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
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
  );

  const renderPortfolioManagement = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Classic</h2>
      </div>

      {/* Historical ROI Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Historical ROI</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded">3M</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">6M</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">1Y</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">ALL</button>
          </div>
        </div>
        
        {/* Simple chart visualization */}
        <div className="relative h-64 bg-gray-50 rounded-lg mb-4">
          <div className="absolute inset-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 text-xs text-gray-500">$12.5k</div>
            <div className="absolute left-0 top-1/4 text-xs text-gray-500">$12k</div>
            <div className="absolute left-0 top-2/4 text-xs text-gray-500">$11.5k</div>
            <div className="absolute left-0 top-3/4 text-xs text-gray-500">$11k</div>
            <div className="absolute left-0 bottom-0 text-xs text-gray-500">$10.5k</div>
            <div className="absolute left-0 bottom-6 text-xs text-gray-500">$10k</div>
            
            {/* Chart line simulation with SVG */}
            <svg className="w-full h-full" viewBox="0 0 800 200">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path
                d="M 50 150 L 120 120 L 180 160 L 240 130 L 300 110 L 360 130 L 420 120 L 480 100 L 540 80 L 600 100 L 660 70 L 720 120"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 50 150 L 120 120 L 180 160 L 240 130 L 300 110 L 360 130 L 420 120 L 480 100 L 540 80 L 600 100 L 660 70 L 720 120 L 720 200 L 50 200 Z"
                fill="url(#gradient)"
              />
              {/* Data points */}
              <circle cx="50" cy="150" r="3" fill="#3B82F6"/>
              <circle cx="120" cy="120" r="3" fill="#3B82F6"/>
              <circle cx="180" cy="160" r="3" fill="#3B82F6"/>
              <circle cx="240" cy="130" r="3" fill="#3B82F6"/>
              <circle cx="300" cy="110" r="3" fill="#3B82F6"/>
              <circle cx="360" cy="130" r="3" fill="#3B82F6"/>
              <circle cx="420" cy="120" r="3" fill="#3B82F6"/>
              <circle cx="480" cy="100" r="3" fill="#3B82F6"/>
              <circle cx="540" cy="80" r="3" fill="#3B82F6"/>
              <circle cx="600" cy="100" r="3" fill="#3B82F6"/>
              <circle cx="660" cy="70" r="3" fill="#3B82F6"/>
              <circle cx="720" cy="120" r="3" fill="#3B82F6"/>
            </svg>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-12">
              <span>Feb 10</span>
              <span>Feb 17</span>
              <span>Feb 24</span>
              <span>Mar 3</span>
              <span>Mar 10</span>
              <span>Mar 17</span>
              <span>Mar 24</span>
              <span>Mar 31</span>
              <span>Apr 7</span>
              <span>Apr 14</span>
              <span>Apr 21</span>
              <span>Apr 28</span>
              <span>May 5</span>
              <span>May 12</span>
            </div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">Apr 28, 2025</div>
            <div className="text-sm font-medium text-gray-900">Actual ROI: <span className="text-green-600">+9.46%</span></div>
            <div className="text-sm text-gray-600">Absolute: $12000</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Portfolio summary</h3>
          
          <div className="space-y-6">
            {/* Volatility */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Volatility (30d):</span>
                <span className="text-lg font-semibold text-gray-900">4.2%</span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full relative" style={{width: '42%'}}>
                    <div className="absolute right-0 top-0 w-4 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* Max Drawdown */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Max drawdown:</span>
                <span className="text-lg font-semibold text-gray-900">7.3%</span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full relative" style={{width: '73%'}}>
                    <div className="absolute right-0 top-0 w-4 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Capital Flows */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Capital Flows</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Contributors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Withdrawals</span>
              </div>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="relative h-48">
            <div className="absolute inset-0">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 text-xs text-gray-500">$12.5k</div>
              <div className="absolute left-0 top-1/4 text-xs text-gray-500">$12k</div>
              <div className="absolute left-0 top-2/4 text-xs text-gray-500">$11.5k</div>
              <div className="absolute left-0 top-3/4 text-xs text-gray-500">$11k</div>
              <div className="absolute left-0 bottom-6 text-xs text-gray-500">$10k</div>
              
              {/* Bars */}
              <div className="flex items-end justify-center h-full px-8 pb-6 gap-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const heights = [60, 80, 50, 55, 70, 65, 45];
                  const greenHeights = [40, 50, 30, 35, 45, 40, 30];
                  return (
                    <div key={day} className="flex flex-col items-center gap-2">
                      <div className="relative w-8">
                        {/* Red (withdrawals) - bottom part */}
                        <div 
                          className="w-full bg-red-500 rounded-t"
                          style={{height: `${heights[index] - greenHeights[index]}px`}}
                        ></div>
                        {/* Green (contributors) - top part */}
                        <div 
                          className="w-full bg-green-500 rounded-t"
                          style={{height: `${greenHeights[index]}px`}}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Wallet Balance:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bitcoin */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">₿</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Bitcoin (BTC):</div>
              <div className="text-xl font-bold text-gray-900">40%</div>
            </div>
          </div>

          {/* Ethereum */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">◆</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Ethereum (ETH):</div>
              <div className="text-xl font-bold text-gray-900">30%</div>
            </div>
          </div>

          {/* USDT */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">$</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">USDT:</div>
              <div className="text-xl font-bold text-gray-900">20%</div>
            </div>
          </div>

          {/* Unallocated */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">□</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Unallocated:</div>
              <div className="text-xl font-bold text-gray-900">10%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFundApplications = () => {
    const fundApplications = [
      {
        id: 1,
        fundName: 'Crypto Pulse',
        applicant: 'Orion Capital',
        type: 'External Fund',
        riskLevel: 'Medium',
        submittedOn: '2025-05-01',
        status: 'In Review'
      },
      {
        id: 2,
        fundName: 'ChainVestor Growth',
        applicant: 'Internal Team',
        type: 'External Fund',
        riskLevel: 'Conservative',
        submittedOn: '2025-04-28',
        status: 'In Review'
      },
      {
        id: 3,
        fundName: 'DeFi Exposure A',
        applicant: 'DeFi Group Ltd',
        type: 'External Fund',
        riskLevel: 'Aggressive',
        submittedOn: '2025-05-02',
        status: 'Pending'
      }
    ];

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Fund applications</h2>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Fund name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Risk level
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Submitted on
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fundApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {application.fundName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {application.applicant}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {application.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        application.riskLevel === 'Conservative' ? 'bg-green-100 text-green-800' :
                        application.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        application.riskLevel === 'Aggressive' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {application.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {application.submittedOn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        application.status === 'In Review' ? 'bg-blue-100 text-blue-800' :
                        application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancials = () => {
    const topSummaryData = [
      {
        title: 'Total revenue (YTD):',
        value: '$326,000',
        icon: DollarSign
      },
      {
        title: 'Total expenses (YTD):',
        value: '$122,500',
        icon: TrendingUp
      },
      {
        title: 'Profit margin:',
        value: '62.4%',
        icon: BarChart3
      },
      {
        title: 'Pending transactions:',
        value: '14',
        icon: Clock
      }
    ];

    const feeBreakdown = [
      {
        feeType: 'Wakala Fees',
        description: 'Agent-based management commission',
        totalCollected: '$96,000',
        active: true
      },
      {
        feeType: 'Management fees',
        description: 'Annual portfolio handling',
        totalCollected: '$174,500',
        active: true
      },
      {
        feeType: 'Transaction fees',
        description: 'Crypto & fiat transfer costs',
        totalCollected: '$55,500',
        active: false
      }
    ];

    const transactionLogs = [
      {
        txId: 'TXD-001',
        user: 'Alice R.',
        type: 'Deposit',
        amount: '2,500',
        currency: 'USDT',
        gateway: 'Fireblocks',
        status: 'success',
        date: '2025-05-10'
      },
      {
        txId: 'TXD-001',
        user: 'Alice R.',
        type: 'Deposit',
        amount: '2,500',
        currency: 'USDT',
        gateway: 'Fireblocks',
        status: 'success',
        date: '2025-05-10'
      },
      {
        txId: 'TXD-001',
        user: 'Alice R.',
        type: 'Deposit',
        amount: '2,500',
        currency: 'USDT',
        gateway: 'Fireblocks',
        status: 'success',
        date: '2025-05-10'
      },
      {
        txId: 'TXD-001',
        user: 'Alice R.',
        type: 'Deposit',
        amount: '2,500',
        currency: 'USDT',
        gateway: 'Fireblocks',
        status: 'success',
        date: '2025-05-10'
      },
      {
        txId: 'TXD-001',
        user: 'Alice R.',
        type: 'Deposit',
        amount: '2,500',
        currency: 'USDT',
        gateway: 'Fireblocks',
        status: 'success',
        date: '2025-05-10'
      }
    ];

    return (
      <div className="space-y-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Financials</h2>
        </div>

        {/* Top Summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topSummaryData.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{item.title}</span>
                  <item.icon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Fee breakdown</h3>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-300">
              <ExternalLink className="w-4 h-4" />
              See more
            </button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Fee type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Total collected</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {feeBreakdown.map((fee, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {fee.feeType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {fee.description}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {fee.totalCollected}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        {fee.active ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span>Yes</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction Logs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Transaction logs</h3>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-300">
              <Database className="w-4 h-4" />
              Transaction system
            </button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Tx ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">User</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Currency</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Gateway</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactionLogs.map((tx, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {tx.txId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {tx.user}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {tx.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {tx.currency}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {tx.gateway}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderKYCCompliance = () => {
    const summaryData = [
      {
        title: 'Verified users:',
        value: '12,830',
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        title: 'Pending requests:',
        value: '67',
        icon: Clock,
        color: 'text-yellow-600'
      },
      {
        title: 'Rejected submissions:',
        value: '18',
        icon: XCircle,
        color: 'text-red-600'
      },
      {
        title: 'Risk alerts (Elliptic):',
        value: '5',
        icon: AlertTriangle,
        color: 'text-orange-600'
      }
    ];

    const kycRequests = [
      {
        id: 1,
        name: 'Blackrock Ltd',
        status: 'Pending',
        submitted: 'Apr 23',
        statusColor: 'bg-yellow-100 text-yellow-800'
      },
      {
        id: 2,
        name: 'Blackrock Ltd',
        status: 'Flagged',
        submitted: 'Apr 23',
        statusColor: 'bg-red-100 text-red-800'
      },
      {
        id: 3,
        name: 'Blackrock Ltd',
        status: 'Incomplete',
        submitted: 'Apr 23',
        statusColor: 'bg-gray-100 text-gray-800'
      }
    ];

    const integrations = [
      {
        name: 'Open Elliptic Dashboard',
        icon: ExternalLink
      },
      {
        name: 'Open Fireblocks Console',
        icon: ExternalLink
      },
      {
        name: 'Open Audit Log (OpenTelemetry)',
        icon: ExternalLink
      }
    ];

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">KYC & Compliance</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Find User by Email / ID"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export KYC Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryData.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm text-gray-600">{item.title}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KYC Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">KYC Requests</h3>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-300">
              <ExternalLink className="w-4 h-4" />
              See more
            </button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Submitted</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {kycRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${request.statusColor}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.submitted}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        View log
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Integrations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrations.map((integration, index) => (
              <button
                key={index}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
              >
                <integration.icon className="w-5 h-5" />
                {integration.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 font-medium">
              <Download className="w-5 h-5" />
              Export KYC Report (CSV)
            </button>
            <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 font-medium">
              <Settings className="w-5 h-5" />
              Manage KYC Settings
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSupportRequests = () => {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Support requests</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Find User by Email / ID"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Open tickets:</p>
                <p className="text-3xl font-semibold text-gray-900">24</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Avg. response time:</p>
                <p className="text-3xl font-semibold text-gray-900">3h 12m</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Waiting for agent:</p>
                <p className="text-3xl font-semibold text-gray-900">8</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Escalated:</p>
                <p className="text-3xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Tickets</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Zendesk
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">johndoe@gmail.com</td>
                  <td className="px-6 py-4 text-sm text-gray-600">"Issue with withdrawal"</td>
                  <td className="px-6 py-4 text-sm text-gray-600">May 13</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Open
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Reply
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">johndoe@gmail.com</td>
                  <td className="px-6 py-4 text-sm text-gray-600">"Issue with withdrawal"</td>
                  <td className="px-6 py-4 text-sm text-gray-600">May 13</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Open
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Reply
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">johndoe@gmail.com</td>
                  <td className="px-6 py-4 text-sm text-gray-600">"Issue with withdrawal"</td>
                  <td className="px-6 py-4 text-sm text-gray-600">May 13</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Open
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Reply
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Open Zendesk Dashboard
            </button>
            <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Assigned Tickets
            </button>
            <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              SLA Performance Report
            </button>
            <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              User Feedback Trends
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMarketingAnalytics = () => {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Marketing & analytics</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View in Google Analytics
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* User Engagement */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">User engagement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">DAU:</p>
                  <p className="text-2xl font-semibold text-gray-900">2,430</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  12% vs last 7d
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">WAU:</p>
                  <p className="text-2xl font-semibold text-gray-900">8,290</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  4%
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">MAU:</p>
                  <p className="text-2xl font-semibold text-gray-900">22,100</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  7%
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. session time:</p>
                  <p className="text-2xl font-semibold text-gray-900">3m 42s</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  6%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Conversion funnel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Landing views:</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold text-gray-900">1,244</p>
                    <span className="text-xs text-gray-500">2,123</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Signups started:</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold text-gray-900">-</p>
                    <span className="text-xs text-gray-500">3,120</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">KYC completed:</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold text-gray-900">76%</p>
                    <span className="text-xs text-gray-500">2,371</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">First deposit:</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold text-gray-900">64%</p>
                    <span className="text-xs text-gray-500">1,518</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Fund investment:</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold text-gray-900">42%</p>
                    <span className="text-xs text-gray-500">982</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Highlights */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Investment highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total value locked (TVL):</p>
                  <p className="text-2xl font-semibold text-gray-900">$6.23M</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  8%
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total transactions:</p>
                  <p className="text-2xl font-semibold text-gray-900">28,140</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  10%
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. portfolio size:</p>
                <p className="text-2xl font-semibold text-gray-900">$3,100</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">New investors (last 7d):</p>
                  <p className="text-2xl font-semibold text-gray-900">192</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  5%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSecurity = () => {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Security</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              OpenTelemetry
            </button>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              Elliptic
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Users without 2FA:</p>
                <p className="text-3xl font-semibold text-gray-900">74</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">New devices (last 24h):</p>
                <p className="text-3xl font-semibold text-gray-900">213</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Logins from flagged countries:</p>
                <p className="text-3xl font-semibold text-gray-900">3</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Accounts flagged as suspicious:</p>
                <p className="text-3xl font-semibold text-gray-900">5</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Failed login attempts (24h):</p>
                <p className="text-3xl font-semibold text-gray-900">88</p>
              </div>
            </div>
          </div>
        </div>

        {/* Suspicious Logins */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Suspicious logins</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Device</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">jawad@x.com</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Iran 🇮🇷</td>
                  <td className="px-6 py-4 text-sm text-gray-600">iPhone 14</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                        <XCircle className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-sm text-gray-600">No 2FA</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">5m ago</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">salim@z.com</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Russia 🇷🇺</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Windows Chrome</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                        <X className="w-3 h-3 text-red-600" />
                      </div>
                      <span className="text-sm text-red-600">Blocked IP</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">12h ago</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">aya@y.com</td>
                  <td className="px-6 py-4 text-sm text-gray-600">UAE 🇦🇪</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Macbook Safari</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-green-600">Verified</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">22h ago</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* User Security */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">User security</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">2FA Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Last login</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Devices</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Risk score</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { email: 'amir@z.com', twofa: false, lastLogin: '1h ago', devices: 5, risk: 'Medium' },
                  { email: 'sara@y.net', twofa: true, lastLogin: '3d ago', devices: 1, risk: 'Low' },
                  { email: 'amir@z.com', twofa: false, lastLogin: '1h ago', devices: 5, risk: 'Medium' },
                  { email: 'sara@y.net', twofa: true, lastLogin: '3d ago', devices: 1, risk: 'Low' },
                  { email: 'amir@z.com', twofa: false, lastLogin: '1h ago', devices: 5, risk: 'Medium' },
                  { email: 'sara@y.net', twofa: true, lastLogin: '3d ago', devices: 1, risk: 'Low' },
                  { email: 'amir@z.com', twofa: false, lastLogin: '1h ago', devices: 5, risk: 'Medium' },
                  { email: 'sara@y.net', twofa: true, lastLogin: '3d ago', devices: 1, risk: 'Low' },
                ].map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.twofa ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm text-gray-600">{user.twofa ? 'On' : 'Off'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.devices}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.risk === 'Low' ? 'bg-green-400' : user.risk === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                        <span className="text-sm text-gray-600">{user.risk}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">Viewed: 10 out of 1230</span>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
              <div className="flex items-center gap-1 ml-4">
                {[1, 2, 3, 4, 5, 6, 7, '...', 123].map((page, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 text-sm rounded ${
                      page === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMonitoring = () => {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Monitoring</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              OpenTelemetry
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">API Gateway:</p>
                  <p className="text-xl font-semibold text-gray-900">230 ms</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <X className="w-4 h-4" />
                0.2%
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">Wallet service:</p>
                  <p className="text-xl font-semibold text-gray-900">2.3 s</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-sm text-yellow-600">Slow</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <X className="w-4 h-4" />
                1.8%
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">KYC Processor:</p>
                  <p className="text-xl font-semibold text-gray-900">450 ms</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm text-green-600">Up</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <X className="w-4 h-4" />
                0.0%
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">Analytics sync:</p>
                  <p className="text-xl font-semibold text-gray-900">1.1 s</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-sm text-yellow-600">Delayed</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <X className="w-4 h-4" />
                0.5%
              </div>
            </div>
          </div>
        </div>

        {/* API Latency and Error Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* API Latency Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API latency (24h)</h3>
            <div className="h-64 flex items-end justify-between border-b border-l border-gray-200 pl-10 pb-8 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                <span>2000</span>
                <span>1750</span>
                <span>1500</span>
                <span>1250</span>
                <span>1000</span>
                <span>750</span>
                <span>500</span>
                <span>250</span>
              </div>
              
              {/* Chart line simulation */}
              <div className="flex-1 h-full relative">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    points="20,120 50,140 80,130 110,125 140,120 170,118 200,125 230,130 260,128 290,135 320,140 350,145 380,150"
                  />
                  <circle cx="110" cy="125" r="3" fill="#3B82F6" />
                  <circle cx="170" cy="118" r="3" fill="#3B82F6" />
                </svg>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute -bottom-6 left-10 right-0 flex justify-between text-xs text-gray-500">
                <span>May 19</span>
                <span>May 20</span>
                <span>May 21</span>
                <span>May 22</span>
                <span>May 23</span>
                <span>May 24</span>
                <span>May 25</span>
                <span>May 26</span>
                <span>May 27</span>
              </div>
              
              {/* Legend */}
              <div className="absolute top-4 left-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  <span>Avg. latency (ms)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-300"></div>
                  <span>2s threshold</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Logs */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Error logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Service</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Error code</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Message</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Requests Affected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { time: '14:23 UTC', service: 'Wallet Service', code: '504', message: 'Timeout connecting to Fireblocks', requests: 27, status: 'Open' },
                    { time: '13:59 UTC', service: 'API Gateway', code: '500', message: 'Uncaught exception in auth middleware', requests: 4, status: 'Open' },
                    { time: '14:23 UTC', service: 'Wallet Service', code: '504', message: 'Timeout connecting to Fireblocks', requests: 27, status: 'Open' },
                    { time: '13:59 UTC', service: 'API Gateway', code: '500', message: 'Uncaught exception in auth middleware', requests: 4, status: 'Open' },
                    { time: '14:23 UTC', service: 'Wallet Service', code: '504', message: 'Timeout connecting to Fireblocks', requests: 27, status: 'Open' },
                  ].map((error, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-xs text-gray-900">{error.time}</td>
                      <td className="px-4 py-2 text-xs text-gray-600">{error.service}</td>
                      <td className="px-4 py-2 text-xs text-gray-600">{error.code}</td>
                      <td className="px-4 py-2 text-xs text-gray-600">{error.message}</td>
                      <td className="px-4 py-2 text-xs text-gray-600 text-center">{error.requests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Current Incidents and System Uptime */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Incidents */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current incidents</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Alert</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Severity</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-xs text-gray-900">10:02 UTC</td>
                                         <td className="px-4 py-2 text-xs text-gray-600">&gt;10% of API requests &gt;2s latency</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">High</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Open</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs text-gray-900">08:41 UTC</td>
                    <td className="px-4 py-2 text-xs text-gray-600">KYC processor returned 10x 5xx errors</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Medium</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Resolved</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs text-gray-900">07:00 UTC</td>
                    <td className="px-4 py-2 text-xs text-gray-600">Login flood from single IP</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">Critical</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Open</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* System Uptime */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System uptime</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Component</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">24h uptime</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">7d uptime</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">30d uptime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-xs font-medium text-gray-900">API gateway</td>
                    <td className="px-4 py-2 text-xs text-gray-600">99.98%</td>
                    <td className="px-4 py-2 text-xs text-gray-600">99.95%</td>
                    <td className="px-4 py-2 text-xs text-gray-600">99.90%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs font-medium text-gray-900">Wallet service</td>
                    <td className="px-4 py-2 text-xs text-gray-600">99.72%</td>
                    <td className="px-4 py-2 text-xs text-gray-600">99.50%</td>
                    <td className="px-4 py-2 text-xs text-gray-600">98.87%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs font-medium text-gray-900">KYC processor</td>
                    <td className="px-4 py-2 text-xs text-gray-600">100.00%</td>
                    <td className="px-4 py-2 text-xs text-gray-600">100.00%</td>
                    <td className="px-4 py-2 text-xs text-gray-600">100.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'user-management':
        return renderUserManagement();
      case 'portfolio-management':
        return renderPortfolioManagement();
      case 'fund-applications':
        return renderFundApplications();
      case 'financials':
        return renderFinancials();
      case 'kyc-compliance':
        return renderKYCCompliance();
      case 'support-requests':
        return renderSupportRequests();
      case 'marketing-analytics':
        return renderMarketingAnalytics();
      case 'security':
        return renderSecurity();
      case 'monitoring':
        return renderMonitoring();
      case 'dashboard':
      default:
        return renderDashboard();
    }
  };

  const renderUserModal = () => {
    if (!userModalOpen || !selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">User description</h2>
            <button
              onClick={closeUserModal}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-900">{selectedUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">E-mail:</span>
                  <span className="font-medium text-gray-900">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-medium text-gray-900">{selectedUser.userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    selectedUser.status === 'Active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account type:</span>
                  <span className="font-medium text-gray-900">{selectedUser.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Registered on:</span>
                  <span className="font-medium text-gray-900">{selectedUser.registeredOn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk profile:</span>
                  <span className="font-medium text-gray-900">{selectedUser.risk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wallet:</span>
                  <span className="font-medium text-gray-900">{selectedUser.wallet}</span>
                </div>
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total invested:</span>
                  <span className="font-medium text-gray-900">{selectedUser.totalInvested}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current portfolio:</span>
                  <span className="font-medium text-gray-900">{selectedUser.currentPortfolio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI:</span>
                  <span className={`font-medium ${
                    selectedUser.roi.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedUser.roi}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Funds joined:</span>
                  <span className="font-medium text-gray-900">{selectedUser.fundsJoined}</span>
                </div>
              </div>
            </div>

            {/* KYC & Compliance */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC & Compliance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">National ID:</span>
                  <span className={`font-medium ${
                    selectedUser.kyc.nationalId === 'Uploaded' ? 'text-green-600' :
                    selectedUser.kyc.nationalId === 'Pending' ? 'text-yellow-600' :
                    selectedUser.kyc.nationalId === 'Missing' ? 'text-gray-600' :
                    'text-red-600'
                  }`}>
                    {selectedUser.kyc.nationalId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Selfie:</span>
                  <span className={`font-medium ${
                    selectedUser.kyc.selfie === 'Uploaded' ? 'text-green-600' :
                    selectedUser.kyc.selfie === 'Pending' ? 'text-yellow-600' :
                    selectedUser.kyc.selfie === 'N/A' ? 'text-gray-600' :
                    'text-red-600'
                  }`}>
                    {selectedUser.kyc.selfie}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Proof of address:</span>
                  <span className={`font-medium ${
                    selectedUser.kyc.proofOfAddress === 'Uploaded' ? 'text-green-600' :
                    selectedUser.kyc.proofOfAddress === 'Pending' ? 'text-yellow-600' :
                    selectedUser.kyc.proofOfAddress === 'Missing' ? 'text-red-600' :
                    'text-red-600'
                  }`}>
                    {selectedUser.kyc.proofOfAddress}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  View documents
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Verify
                </button>
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedUser.recentActivity.map((activity, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-4 py-3 text-sm text-gray-900">{activity.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{activity.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{activity.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Profile Summary (.PDF)
              </button>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reset 2FA
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  <UserX className="w-4 h-4" />
                  Suspend Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg font-medium transition-colors ${
                activeSection === 'dashboard' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveSection('user-management')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors ${
                activeSection === 'user-management' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              User management
            </button>
            <button 
              onClick={() => setActiveSection('portfolio-management')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors ${
                activeSection === 'portfolio-management' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Portfolio & fund management
            </button>
            <button 
              onClick={() => setActiveSection('fund-applications')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors ${
                activeSection === 'fund-applications' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              Fund applications
            </button>
            <button 
              onClick={() => setActiveSection('financials')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors ${
                activeSection === 'financials' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              Financials
            </button>
            <button 
              onClick={() => setActiveSection('kyc-compliance')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors ${
                activeSection === 'kyc-compliance' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Shield className="w-5 h-5" />
              KYC & Compliance
            </button>
            <button 
              onClick={() => setActiveSection('support-requests')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors ${
                activeSection === 'support-requests' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Support requests
            </button>
            <button 
              onClick={() => setActiveSection('marketing-analytics')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors ${
                activeSection === 'marketing-analytics' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Marketing & Analytics
            </button>
            <button 
              onClick={() => setActiveSection('security')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors ${
                activeSection === 'security' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              Security
            </button>
            <button 
              onClick={() => setActiveSection('monitoring')}
              className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors ${
                activeSection === 'monitoring' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Activity className="w-5 h-5" />
              Monitoring
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
      
      {/* User Modal */}
      {renderUserModal()}
    </div>
  );
} 