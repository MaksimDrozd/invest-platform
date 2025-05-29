import { useState } from 'react';
import { 
  Plus,
  Filter,
  MoreVertical,
  BarChart3,
  CheckCircle,
  Clock,
  Pause
} from 'lucide-react';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const tabs = [
    { id: 'overview', label: 'Portfolio overview' },
    { id: 'classic', label: 'Classic' },
    { id: 'classb', label: 'Class B' },
    { id: 'classc', label: 'Class C' },
    { id: 'watchlist', label: 'Watchlist' }
  ];

  const periods = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

  const portfolioSummary = {
    totalValue: 12480.37,
    totalInvested: 12100,
    unrealizedProfit: 380.37,
    roi: 12.7,
    roiChange: 12.7
  };

  const funds = [
    {
      name: 'Classic',
      value: 5000.00,
      roi: 18.2,
      risk: 'Medium',
      status: 'Active',
      color: 'bg-green-500'
    },
    {
      name: 'Class B',
      value: 4300.00,
      roi: 24.5,
      risk: 'High',
      status: 'Active',
      color: 'bg-blue-500'
    },
    {
      name: 'Class C',
      value: 3180.37,
      roi: 6.2,
      risk: 'Low',
      status: 'Active',
      color: 'bg-red-500'
    }
  ];

  const activities = [
    { date: 'Apr 25', action: 'Invested', fund: 'Classic', amount: '$500', status: 'Done' },
    { date: 'Apr 24', action: 'Deposited', fund: 'Class B - Classic', amount: '$250', status: 'Done' },
    { date: 'Apr 23', action: 'Withdrawal', fund: 'Class C', amount: '$200', status: 'Pending' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Pause className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Withdraw from fund
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Portfolio Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Total portfolio value</p>
            <p className="text-2xl font-bold text-gray-900">${portfolioSummary.totalValue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">(+{portfolioSummary.roiChange}%)</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Total invested:</p>
            <p className="text-2xl font-bold text-gray-900">${portfolioSummary.totalInvested.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Unrealized Profit:</p>
            <p className="text-2xl font-bold text-green-600">+${portfolioSummary.unrealizedProfit.toFixed(2)}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">ROI:</p>
            <p className="text-2xl font-bold text-green-600">+{portfolioSummary.roi}%</p>
          </div>
        </div>
      </div>

      {/* Performance Chart & Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance chart</h3>
            <div className="flex items-center gap-1">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    selectedPeriod === period
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center relative">
            <div className="absolute top-4 left-4 text-xs text-gray-500">
              <div>Apr 17, 2025</div>
              <div>Portfolio value: $13,000</div>
              <div>Day change: +$210.15</div>
              <div>Total ROI: +6,465</div>
            </div>
            
            {/* Chart representation */}
            <svg className="w-full h-full" viewBox="0 0 400 250">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              <g stroke="#e5e7eb" strokeWidth="1">
                <line x1="0" y1="50" x2="400" y2="50"/>
                <line x1="0" y1="100" x2="400" y2="100"/>
                <line x1="0" y1="150" x2="400" y2="150"/>
                <line x1="0" y1="200" x2="400" y2="200"/>
              </g>
              
              {/* Area under curve */}
              <path
                d="M20,180 L60,160 L100,170 L140,140 L180,155 L220,130 L260,145 L300,115 L340,120 L380,105 L380,250 L20,250 Z"
                fill="url(#gradient)"
              />
              
              {/* Main line */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points="20,180 60,160 100,170 140,140 180,155 220,130 260,145 300,115 340,120 380,105"
              />
              
              {/* Data points */}
              <circle cx="380" cy="105" r="4" fill="#3b82f6" />
            </svg>
            
            {/* Y-axis labels */}
            <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
              <span>$12.5k</span>
              <span>$12k</span>
              <span>$11.5k</span>
              <span>$11k</span>
              <span>$10.5k</span>
              <span>$10k</span>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-gray-500 px-8">
              <span>Mar 21</span>
              <span>Mar 25</span>
              <span>Mar 28</span>
              <span>Apr 01</span>
              <span>Apr 05</span>
              <span>Apr 09</span>
              <span>Apr 13</span>
              <span>Apr 17</span>
              <span>Apr 21</span>
            </div>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Asset allocation</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1 rounded">
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            {/* Pie Chart */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="33.33 66.67" strokeDashoffset="0"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="33.33 66.67" strokeDashoffset="-33.33"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="33.33 66.67" strokeDashoffset="-66.66"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">33.3%</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              {funds.map((fund) => (
                <div key={fund.name} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${fund.color}`}></div>
                  <span className="text-sm text-gray-700">{fund.name}</span>
                  <span className="text-sm font-medium text-gray-900">${fund.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Your Funds */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Your funds</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fund name ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROI ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status ↕
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {funds.map((fund) => (
                <tr key={fund.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${fund.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{fund.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${fund.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    +{fund.roi}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fund.risk}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fund.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Portfolio Activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Portfolio activity</h3>
            <button className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fund ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.fund}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(activity.status)}
                      <span className="text-sm text-gray-900">{activity.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 