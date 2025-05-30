import { useState } from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import InvestmentSelectionModal from './InvestmentSelectionModal';
import InvestmentConfirmationModal from './InvestmentConfirmationModal';
import InvestmentSuccessModal from './InvestmentSuccessModal';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { FundService } from '../services/FundService';
import type { Fund, WalletNetwork } from '../types';

export default function Watchlist() {
  const [activeTab, setActiveTab] = useState('your-watchlist');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 123;

  // Investment modal states
  const [isInvestmentSelectionModalOpen, setIsInvestmentSelectionModalOpen] = useState(false);
  const [isInvestmentConfirmationModalOpen, setIsInvestmentConfirmationModalOpen] = useState(false);
  const [isInvestmentSuccessModalOpen, setIsInvestmentSuccessModalOpen] = useState(false);
  const [investmentData, setInvestmentData] = useState<{
    selectedFund: Fund;
    amount: number;
    selectedNetwork: WalletNetwork;
  } | null>(null);

  const fundService = container.get<FundService>(TYPES.FundService);

  const tabs = [
    { id: 'your-watchlist', label: 'Your watchlist' },
    { id: 'recommendations', label: 'Recommendations' }
  ];

  // Mock data based on the screenshot
  const watchlistFunds = [
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '+30%'
    },
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '-15.4%'
    },
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '+30%'
    },
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '-15.4%'
    },
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '+30%'
    },
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '-15.4%'
    },
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '+30%'
    },
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '-15.4%'
    },
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '+30%'
    },
    {
      name: 'Aurora Growth Fund',
      roi: '+61.5%',
      risk: 'High',
      last7d: '+6.2%',
      pnl: '-15.4%'
    }
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

  const getPnlColor = (pnl: string) => {
    return pnl.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  // Investment handlers
  const handleInvestClick = () => {
    setIsInvestmentSelectionModalOpen(true);
  };

  const handleInvestmentSelectionProceed = (data: {
    selectedFund: Fund;
    amount: number;
    selectedNetwork: WalletNetwork;
  }) => {
    setInvestmentData(data);
    setIsInvestmentSelectionModalOpen(false);
    setIsInvestmentConfirmationModalOpen(true);
  };

  const handleInvestmentConfirmationProceed = async () => {
    if (investmentData) {
      try {
        await fundService.investInFund('current-user-id', {
          fundId: investmentData.selectedFund.id,
          amount: investmentData.amount,
          network: investmentData.selectedNetwork.name
        });
        
        setIsInvestmentConfirmationModalOpen(false);
        setIsInvestmentSuccessModalOpen(true);
      } catch (error) {
        console.error('Investment failed:', error);
      }
    }
  };

  const handleInvestmentConfirmationBack = () => {
    setIsInvestmentConfirmationModalOpen(false);
    setIsInvestmentSelectionModalOpen(true);
  };

  const handleCloseAllInvestmentModals = () => {
    setIsInvestmentSelectionModalOpen(false);
    setIsInvestmentConfirmationModalOpen(false);
    setIsInvestmentSuccessModalOpen(false);
    setInvestmentData(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Watchlist</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-gray-900 border-gray-900'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Watchlist Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Fund Table */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fund name ↕
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI ↕
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk ↕
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last 7d ↕
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P&L ↕
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {watchlistFunds.map((fund, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">A</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{fund.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      {fund.roi}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fund.risk}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {fund.last7d}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPnlColor(fund.pnl)}`}>
                      {fund.pnl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={handleInvestClick}
                          className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                        >
                          Invest Now
                        </button>
                        <button className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                          View
                        </button>
                      </div>
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

      {/* Investment Modals */}
      <InvestmentSelectionModal
        isOpen={isInvestmentSelectionModalOpen}
        onClose={handleCloseAllInvestmentModals}
        onProceed={handleInvestmentSelectionProceed}
      />

      {investmentData && (
        <InvestmentConfirmationModal
          isOpen={isInvestmentConfirmationModalOpen}
          onProceed={handleInvestmentConfirmationProceed}
          onBack={handleInvestmentConfirmationBack}
          investmentData={investmentData}
        />
      )}

      {investmentData && (
        <InvestmentSuccessModal
          isOpen={isInvestmentSuccessModalOpen}
          onClose={handleCloseAllInvestmentModals}
          investmentDetails={{
            amount: investmentData.amount,
            fundName: investmentData.selectedFund.name
          }}
        />
      )}
    </div>
  );
} 