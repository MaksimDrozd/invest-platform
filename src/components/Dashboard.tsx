import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowUp,
  ArrowDown,
  BarChart3,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const navigate = useNavigate();

  const portfolioSummary = {
    totalValue: 12480.37,
    todayChange: 134.20,
    todayChangePercent: 1.09,
    riskProfile: 'Balanced',
    portfolioType: 'Active',
    lastSync: '5 mins ago'
  };

  const assetAllocation = [
    { name: 'Fund A', value: 25, color: 'bg-green-500' },
    { name: 'Fund B', value: 25, color: 'bg-yellow-500' },
    { name: 'Fund C', value: 25, color: 'bg-blue-500' },
    { name: 'Fund D', value: 25, color: 'bg-red-500' }
  ];

  const walletBalance = {
    total: 2915.42,
    available: 1700.00,
    inUse: 1015.42,
    pending: 200.00
  };

  const transactions = [
    { date: 'Apr 25', type: 'Deposit', method: 'via Bank', amount: '$600', positive: true },
    { date: 'Apr 24', type: 'Withdrawal', method: '0.1 ETH', amount: '', positive: false },
    { date: 'Apr 22', type: 'Fund Switch', method: 'From Class B to Classic', amount: '', positive: false },
    { date: 'Apr 20', type: 'Profit Share Distributed', method: '', amount: '+$45', positive: true }
  ];

  const periods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
      </div>

      {/* Portfolio Summary */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Portfolio summary</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total portfolio value</p>
            <p className="text-xl font-bold text-gray-900">${portfolioSummary.totalValue.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Today's Change</p>
            <p className="text-xl font-bold text-green-600">
              +${portfolioSummary.todayChange.toFixed(2)}
            </p>
            <p className="text-sm text-green-600">
              (+{portfolioSummary.todayChangePercent}%)
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Risk Profile:</p>
            <p className="text-xl font-bold text-gray-900">{portfolioSummary.riskProfile}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Portfolio Type:</p>
            <p className="text-xl font-bold text-gray-900">{portfolioSummary.portfolioType}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Last Sync:</p>
            <p className="text-xl font-bold text-gray-900">{portfolioSummary.lastSync}</p>
          </div>
        </div>
      </div>

      {/* Asset Allocation & Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="25.12 75.36" strokeDashoffset="0"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#eab308" strokeWidth="20" strokeDasharray="25.12 75.36" strokeDashoffset="-25.12"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="25.12 75.36" strokeDashoffset="-50.24"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="25.12 75.36" strokeDashoffset="-75.36"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">25%</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              {assetAllocation.map((fund) => (
                <div key={fund.name} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${fund.color}`}></div>
                  <span className="text-sm text-gray-700">{fund.name}</span>
                  <span className="text-sm font-medium text-gray-900">{fund.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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
          
          {/* Chart Placeholder */}
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative">
            <div className="absolute top-4 left-4 text-xs text-gray-500">
              <div>Apr 17, 2025</div>
              <div>Portfolio value: $13,000</div>
              <div>Day change: +$210.15</div>
              <div>Total ROI: +6,465</div>
            </div>
            
            {/* Simple line chart representation */}
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points="20,150 60,120 100,140 140,110 180,125 220,100 260,115 300,85 340,90 380,75"
              />
              <circle cx="380" cy="75" r="4" fill="#3b82f6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Latest transactions:</h3>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              See full
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {transactions.map((transaction, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm text-gray-600">{transaction.date}</p>
              <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
              {transaction.method && (
                <p className="text-sm text-gray-600">{transaction.method}</p>
              )}
              {transaction.amount && (
                <p className={`text-sm font-medium ${
                  transaction.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Wallet balance:</h3>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Wallet details
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total wallet balance</p>
            <p className="text-xl font-bold text-gray-900">${walletBalance.total.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Available:</p>
            <p className="text-xl font-bold text-gray-900">${walletBalance.available.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">In Use (Invested):</p>
            <p className="text-xl font-bold text-gray-900">${walletBalance.inUse.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Pending Withdrawal:</p>
            <p className="text-xl font-bold text-gray-900">${walletBalance.pending.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors" onClick={() => navigate('/deposit')}>
            <div className="flex items-center gap-2 mb-2">
              <Plus className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Add Funds</span>
            </div>
          </button>
          
          <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDown className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Withdraw</span>
            </div>
          </button>
          
          <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Withdraw from fund</span>
            </div>
          </button>
          
          <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Invest</span>
            </div>
          </button>
        </div>
      </div>

      {/* News & Updates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">News & updates</h3>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              View all
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="w-full h-24 bg-gray-200 rounded-lg mb-3"></div>
              <h4 className="font-medium text-gray-900 mb-2">News heading</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 