import { useState, useRef } from 'react';
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
import WithdrawalModal from './WithdrawalModal';
import FundSelectionModal from './FundSelectionModal';
import WithdrawalFormModal from './WithdrawalFormModal';
import WithdrawalSuccessModal from './WithdrawalSuccessModal';
import WalletNetworkSelectionModal from './WalletNetworkSelectionModal';
import WalletWithdrawalFormModal from './WalletWithdrawalFormModal';
import WithdrawalConfirmationModal from './WithdrawalConfirmationModal';
import InvestmentSelectionModal from './InvestmentSelectionModal';
import InvestmentConfirmationModal from './InvestmentConfirmationModal';
import InvestmentSuccessModal from './InvestmentSuccessModal';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { FundService } from '../services/FundService';
import type { UserFundBalance, WithdrawalAddress, WalletNetwork, TransactionDetails, Fund } from '../types';

interface PieTooltipData {
  x: number;
  y: number;
  label: string;
  percentage: number;
  visible: boolean;
}

export default function Wallet() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pieTooltip, setPieTooltip] = useState<PieTooltipData>({
    x: 0, y: 0, label: '', percentage: 0, visible: false
  });
  const [hoveredPieSegment, setHoveredPieSegment] = useState<number | null>(null);
  const pieChartRef = useRef<SVGSVGElement>(null);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isFundSelectionModalOpen, setIsFundSelectionModalOpen] = useState(false);
  const [isWithdrawalFormModalOpen, setIsWithdrawalFormModalOpen] = useState(false);
  const [isWithdrawalSuccessModalOpen, setIsWithdrawalSuccessModalOpen] = useState(false);
  
  // New states for wallet withdrawal flow
  const [isWalletNetworkSelectionModalOpen, setIsWalletNetworkSelectionModalOpen] = useState(false);
  const [isWalletWithdrawalFormModalOpen, setIsWalletWithdrawalFormModalOpen] = useState(false);
  const [isWithdrawalConfirmationModalOpen, setIsWithdrawalConfirmationModalOpen] = useState(false);
  
  // Data states
  const [selectedFundForWithdrawal, setSelectedFundForWithdrawal] = useState<UserFundBalance | null>(null);
  const [selectedNetworkForWithdrawal, setSelectedNetworkForWithdrawal] = useState<WalletNetwork | null>(null);
  const [withdrawalConfirmationData, setWithdrawalConfirmationData] = useState<{
    selectedNetwork: WalletNetwork;
    address: WithdrawalAddress;
    amount: number;
  } | null>(null);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  
  // Investment modal states
  const [isInvestmentSelectionModalOpen, setIsInvestmentSelectionModalOpen] = useState(false);
  const [isInvestmentConfirmationModalOpen, setIsInvestmentConfirmationModalOpen] = useState(false);
  const [isInvestmentSuccessModalOpen, setIsInvestmentSuccessModalOpen] = useState(false);
  const [investmentData, setInvestmentData] = useState<{
    selectedFund: Fund;
    amount: number;
    selectedNetwork: WalletNetwork;
  } | null>(null);
  
  const totalPages = 7;
  const navigate = useNavigate();
  const fundService = container.get<FundService>(TYPES.FundService);

  const walletSummary = {
    totalBalance: 2915.42,
    available: 1700.00,
    inUse: 1015.42,
    pendingWithdrawal: 200.00
  };

  const chartData = [
    { label: 'Being withdrawn', percentage: 7, color: '#9ca3af' },
    { label: 'Invested', percentage: 35, color: '#10b981' },
    { label: 'Free', percentage: 58, color: '#ef4444' }
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

  const handleWithdrawalTypeSelected = (withdrawalType: 'wallet' | 'fund') => {
    console.log('Selected withdrawal type:', withdrawalType);
    
    if (withdrawalType === 'wallet') {
      // Start wallet withdrawal flow - show network selection
      console.log('Starting wallet withdrawal flow...');
      setIsWithdrawalModalOpen(false);
      setIsWalletNetworkSelectionModalOpen(true);
    } else {
      // Open fund selection modal for fund withdrawal
      console.log('Opening fund selection for withdrawal...');
      setIsWithdrawalModalOpen(false);
      setIsFundSelectionModalOpen(true);
    }
  };

  const handleFundSelected = (selectedFund: UserFundBalance) => {
    console.log('Selected fund for withdrawal:', selectedFund);
    setSelectedFundForWithdrawal(selectedFund);
    setIsFundSelectionModalOpen(false);
    setIsWithdrawalFormModalOpen(true);
  };

  const handleWithdrawalFormCompleted = (data: { selectedFund: UserFundBalance; address: WithdrawalAddress; amount: number }) => {
    console.log('Withdrawal form completed:', data);
    // Here you would submit the withdrawal request to the API
    setIsWithdrawalFormModalOpen(false);
    setSelectedFundForWithdrawal(null);
    // Show success modal
    setIsWithdrawalSuccessModalOpen(true);
  };

  const handleBackToWithdrawalType = () => {
    console.log('Going back to withdrawal type selection');
    setIsFundSelectionModalOpen(false);
    setIsWithdrawalModalOpen(true);
  };

  const handleBackToFundSelection = () => {
    console.log('Going back to fund selection');
    setIsWithdrawalFormModalOpen(false);
    setIsFundSelectionModalOpen(true);
  };

  const handleCloseAllModals = () => {
    console.log('Closing all withdrawal modals');
    setIsWithdrawalModalOpen(false);
    setIsFundSelectionModalOpen(false);
    setIsWithdrawalFormModalOpen(false);
    setIsWithdrawalSuccessModalOpen(false);
    setSelectedFundForWithdrawal(null);
    
    // Close wallet withdrawal modals
    setIsWalletNetworkSelectionModalOpen(false);
    setIsWalletWithdrawalFormModalOpen(false);
    setIsWithdrawalConfirmationModalOpen(false);
    setSelectedNetworkForWithdrawal(null);
    setWithdrawalConfirmationData(null);
    setTransactionDetails(null);
    
    // Close investment modals
    handleCloseAllInvestmentModals();
  };

  // New handlers for wallet withdrawal flow
  const handleNetworkSelected = (selectedNetwork: WalletNetwork) => {
    console.log('Selected network for wallet withdrawal:', selectedNetwork);
    setSelectedNetworkForWithdrawal(selectedNetwork);
    setIsWalletNetworkSelectionModalOpen(false);
    setIsWalletWithdrawalFormModalOpen(true);
  };

  const handleWalletWithdrawalFormCompleted = (data: { selectedNetwork: WalletNetwork; address: WithdrawalAddress; amount: number }) => {
    console.log('Wallet withdrawal form completed:', data);
    setWithdrawalConfirmationData(data);
    setIsWalletWithdrawalFormModalOpen(false);
    setIsWithdrawalConfirmationModalOpen(true);
  };

  const handleWithdrawalConfirmed = () => {
    console.log('Withdrawal confirmed, processing transaction...');
    
    if (withdrawalConfirmationData) {
      // Simulate transaction processing and generate mock transaction details
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      const mockTransactionDetails: TransactionDetails = {
        txHash: mockTxHash,
        amount: withdrawalConfirmationData.amount,
        currency: withdrawalConfirmationData.selectedNetwork.currency,
        network: withdrawalConfirmationData.selectedNetwork.name,
        address: withdrawalConfirmationData.address.address,
        isInstantWithdrawal: true
      };
      
      setTransactionDetails(mockTransactionDetails);
      setIsWithdrawalConfirmationModalOpen(false);
      setWithdrawalConfirmationData(null);
      setSelectedNetworkForWithdrawal(null);
      setIsWithdrawalSuccessModalOpen(true);
    }
  };

  const handleBackToWalletNetworkSelection = () => {
    console.log('Going back to wallet network selection');
    setIsWalletWithdrawalFormModalOpen(false);
    setIsWalletNetworkSelectionModalOpen(true);
  };

  const handleBackToWalletWithdrawalForm = () => {
    console.log('Going back to wallet withdrawal form');
    setIsWithdrawalConfirmationModalOpen(false);
    setIsWalletWithdrawalFormModalOpen(true);
  };

  // Investment handlers
  const handleTransferToFundClick = () => {
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

  const handlePieMouseMove = (event: React.MouseEvent<SVGCircleElement>, item: typeof chartData[0], index: number) => {
    setHoveredPieSegment(index);
    setPieTooltip({
      x: event.clientX,
      y: event.clientY - 60,
      label: item.label,
      percentage: item.percentage,
      visible: true
    });
  };

  const handlePieMouseLeave = () => {
    setPieTooltip(prev => ({ ...prev, visible: false }));
    setHoveredPieSegment(null);
  };

  // Debug logs for modal states
  console.log('Modal states:', {
    isWithdrawalModalOpen,
    isFundSelectionModalOpen,
    isWithdrawalFormModalOpen,
    isWithdrawalSuccessModalOpen,
    selectedFundForWithdrawal
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Pie Chart Tooltip */}
      {pieTooltip.visible && (
        <div 
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none transform -translate-x-1/2"
          style={{ left: pieTooltip.x, top: pieTooltip.y }}
        >
          <div className="font-semibold">{pieTooltip.label}</div>
          <div className="text-gray-300 text-xs">{pieTooltip.percentage}%</div>
        </div>
      )}

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
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-sm text-gray-600 mb-2">Total wallet balance:</p>
                <p className="text-2xl font-bold text-gray-900">${walletSummary.totalBalance.toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-sm text-gray-600 mb-2">Available:</p>
                <p className="text-2xl font-bold text-gray-900">${walletSummary.available.toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-sm text-gray-600 mb-2">In Use (Invested):</p>
                <p className="text-2xl font-bold text-gray-900">${walletSummary.inUse.toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-sm text-gray-600 mb-2">Pending Withdrawal:</p>
                <p className="text-2xl font-bold text-gray-900">${walletSummary.pendingWithdrawal.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Interactive Pie Chart */}
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <svg ref={pieChartRef} className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <filter id="walletPieShadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                {chartData.map((item, index) => {
                  const isHovered = hoveredPieSegment === index;
                  // Calculate stroke dash values based on percentage
                  const circumference = 2 * Math.PI * 40;
                  const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                  
                  // Calculate offset based on previous segments
                  let offset = 0;
                  for (let i = 0; i < index; i++) {
                    offset += (chartData[i].percentage / 100) * circumference;
                  }
                  const strokeDashoffset = -offset;
                  
                  return (
                    <circle 
                      key={item.label}
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke={item.color} 
                      strokeWidth={isHovered ? "22" : "20"}
                      strokeDasharray={strokeDasharray} 
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        filter: isHovered ? "url(#walletPieShadow)" : undefined,
                        opacity: isHovered ? 1 : 0.8
                      }}
                      onMouseMove={(e) => handlePieMouseMove(e, item, index)}
                      onMouseLeave={handlePieMouseLeave}
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* Interactive Legend */}
            <div className="space-y-2">
              {chartData.map((item, index) => {
                const isHovered = hoveredPieSegment === index;
                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 group cursor-pointer p-2 rounded transition-all duration-200 ${
                      isHovered ? 'bg-gray-50 scale-105' : 'hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => setHoveredPieSegment(index)}
                    onMouseLeave={() => setHoveredPieSegment(null)}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full transition-transform duration-200 ${
                        isHovered ? 'scale-125' : 'group-hover:scale-110'
                      }`}
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className={`text-sm transition-colors duration-200 ${
                      isHovered ? 'text-gray-900 font-medium' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {item.label}
                    </span>
                    <span className={`text-sm font-medium transition-colors duration-200 ${
                      isHovered ? 'text-gray-900' : 'text-gray-900'
                    }`}>
                      {item.percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            onClick={() => navigate('/app/deposit')}
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Deposit</span>
            </div>
          </button>
          
          <button 
            onClick={() => setIsWithdrawalModalOpen(true)}
            className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Withdraw</span>
            </div>
          </button>
          
          <button 
            onClick={() => setIsWithdrawalModalOpen(true)}
            className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Withdraw from fund</span>
            </div>
          </button>
          
          <button 
            onClick={handleTransferToFundClick}
            className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
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
                      <button 
                        onClick={() => setIsWithdrawalModalOpen(true)}
                        className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                      >
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

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={handleCloseAllModals}
        onProceed={handleWithdrawalTypeSelected}
      />

      {/* Fund Selection Modal */}
      <FundSelectionModal
        isOpen={isFundSelectionModalOpen}
        onClose={handleCloseAllModals}
        onProceed={handleFundSelected}
        onBack={handleBackToWithdrawalType}
      />

      {/* Withdrawal Form Modal */}
      {selectedFundForWithdrawal && (
        <WithdrawalFormModal
          isOpen={isWithdrawalFormModalOpen}
          onClose={handleCloseAllModals}
          onProceed={handleWithdrawalFormCompleted}
          onBack={handleBackToFundSelection}
          selectedFund={selectedFundForWithdrawal}
        />
      )}

      {/* Withdrawal Success Modal */}
      <WithdrawalSuccessModal
        isOpen={isWithdrawalSuccessModalOpen}
        onClose={handleCloseAllModals}
        transactionDetails={transactionDetails || undefined}
      />

      {/* New Wallet Withdrawal Flow Modals */}
      
      {/* Wallet Network Selection Modal */}
      <WalletNetworkSelectionModal
        isOpen={isWalletNetworkSelectionModalOpen}
        onClose={handleCloseAllModals}
        onProceed={handleNetworkSelected}
        onBack={() => {
          setIsWalletNetworkSelectionModalOpen(false);
          setIsWithdrawalModalOpen(true);
        }}
      />

      {/* Wallet Withdrawal Form Modal */}
      {selectedNetworkForWithdrawal && (
        <WalletWithdrawalFormModal
          isOpen={isWalletWithdrawalFormModalOpen}
          onClose={handleCloseAllModals}
          onProceed={handleWalletWithdrawalFormCompleted}
          onBack={handleBackToWalletNetworkSelection}
          selectedNetwork={selectedNetworkForWithdrawal}
        />
      )}

      {/* Withdrawal Confirmation Modal */}
      {withdrawalConfirmationData && (
        <WithdrawalConfirmationModal
          isOpen={isWithdrawalConfirmationModalOpen}
          onProceed={handleWithdrawalConfirmed}
          onBack={handleBackToWalletWithdrawalForm}
          withdrawalData={withdrawalConfirmationData}
        />
      )}

      {/* Investment Selection Modal */}
      <InvestmentSelectionModal
        isOpen={isInvestmentSelectionModalOpen}
        onClose={handleCloseAllInvestmentModals}
        onProceed={handleInvestmentSelectionProceed}
      />

      {/* Investment Confirmation Modal */}
      {investmentData && (
        <InvestmentConfirmationModal
          isOpen={isInvestmentConfirmationModalOpen}
          onProceed={handleInvestmentConfirmationProceed}
          onBack={handleInvestmentConfirmationBack}
          investmentData={investmentData}
        />
      )}

      {/* Investment Success Modal */}
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