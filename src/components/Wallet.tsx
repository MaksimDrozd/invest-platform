import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download,
  ArrowUp,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

export default function Wallet() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;
  const navigate = useNavigate();

  const walletSummary = {
    totalBalance: 2915.42,
    available: 1700.00,
    inUse: 1015.42,
    pendingWithdrawal: 200.00
  };

  const chartData = [
    { label: 'Being withdrawn', percentage: 7, color: 'bg-gray-400' },
    { label: 'Invested', percentage: 35, color: 'bg-green-500' },
    { label: 'Free', percentage: 58, color: 'bg-red-500' }
  ];

  const assets = [
    { asset: 'USDT', type: 'Crypto', balance: 1200.00 },
    { asset: 'USDT', type: 'Crypto', balance: 1200.00 },
    { asset: 'USDT', type: 'Crypto', balance: 1200.00 }
  ];

  const transactions = [
    { date: 'Apr 28', type: 'Deposit', asset: 'USDT', amount: '+$500.00', status: 'Done', notes: 'TRON Network' },
    { date: 'Apr 28', type: 'Deposit', asset: 'USDT', amount: '+$500.00', status: 'Done', notes: 'TRON Network' },
    { date: 'Apr 28', type: 'Deposit', asset: 'USDT', amount: '+$500.00', status: 'Done', notes: 'TRON Network' },
    { date: 'Apr 28', type: 'Deposit', asset: 'USDT', amount: '+$500.00', status: 'Done', notes: 'TRON Network' },
    { date: 'Apr 28', type: 'Deposit', asset: 'USDT', amount: '+$500.00', status: 'Done', notes: 'TRON Network' }
  ];

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === i
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<span key={i} className="px-2 text-gray-400">...</span>);
      }
    }
    return pages;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
      </div>

      {/* Total Wallet Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Total Wallet Summary</h2>
        
        <div className="flex items-center gap-8">
          {/* Summary Cards */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Total wallet balance:</p>
                <p className="text-2xl font-bold text-gray-900">${walletSummary.totalBalance.toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Available:</p>
                <p className="text-2xl font-bold text-gray-900">${walletSummary.available.toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">In Use (Invested):</p>
                <p className="text-2xl font-bold text-gray-900">${walletSummary.inUse.toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Pending Withdrawal:</p>
                <p className="text-2xl font-bold text-gray-900">${walletSummary.pendingWithdrawal.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="145.6 105.6" strokeDashoffset="0"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="87.85 163.35" strokeDashoffset="-145.6"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#9ca3af" strokeWidth="20" strokeDasharray="17.57 233.63" strokeDashoffset="-233.45"/>
              </svg>
            </div>
            
            {/* Legend */}
            <div className="space-y-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/deposit')}
            className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Add Funds</span>
            </div>
          </button>
          
          <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp className="w-4 h-4 text-gray-700" />
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
              <RefreshCw className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Transfer to Fund</span>
            </div>
          </button>
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Asset Table</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">{asset.asset}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{asset.asset}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${asset.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
                        Withdraw
                      </button>
                      <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
                        Deposit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
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
                  Type ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes ↕
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.asset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-900">{transaction.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Viewed 10 out of 1230
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1">
                {renderPagination()}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 