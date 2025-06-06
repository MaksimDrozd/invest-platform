import { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import InvestmentSelectionModal from './InvestmentSelectionModal';
import InvestmentConfirmationModal from './InvestmentConfirmationModal';
import InvestmentSuccessModal from './InvestmentSuccessModal';
import FundDetails from './FundDetails';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { FundService } from '../services/FundService';
import type { Fund, WalletNetwork } from '../types';

export default function Market() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFund, setSelectedFund] = useState<{id: string, name: string} | null>(null);
  const totalPages = 7;

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

  const funds = Array(10).fill({
    name: 'Halogen Digital Assets',
    apy: '+23.5%',
    ytd: '+14.2%',
    volatility: 'High',
    volatilityPercent: '34.8%',
    minInvestment: 'From $250',
    fees: '1.5% yearly + 10% profit share'
  });

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

  // If a fund is selected, show FundDetails
  if (selectedFund) {
    return (
      <FundDetails
        fundId={selectedFund.id}
        fundName={selectedFund.name}
        onBack={() => setSelectedFund(null)}
      />
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Fund market</h1>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 ml-4">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Fund Table */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  APY ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  YTD ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volatility ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Investment ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fees ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {funds.map((fund, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">H</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{fund.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fund.apy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fund.ytd}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fund.volatility} / {fund.volatilityPercent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fund.minInvestment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fund.fees}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const fundId = fund.name.toLowerCase().replace(/\s+/g, '');
                          setSelectedFund({id: fundId, name: fund.name});
                        }}
                        className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        View
                      </button>
                      <button 
                        onClick={handleInvestClick}
                        className="px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded hover:bg-gray-800"
                      >
                        Invest Now
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