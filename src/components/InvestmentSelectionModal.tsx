import { useState, useEffect } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { FundService } from '../services/FundService';
import type { Fund, WalletNetwork } from '../types';

interface InvestmentSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (data: {
    selectedFund: Fund;
    amount: number;
    selectedNetwork: WalletNetwork;
  }) => void;
}

export default function InvestmentSelectionModal({ 
  isOpen, 
  onClose, 
  onProceed 
}: InvestmentSelectionModalProps) {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<WalletNetwork | null>(null);
  const [loading, setLoading] = useState(true);

  const fundService = container.get<FundService>(TYPES.FundService);

  // Mock wallet balances for different networks
  const walletNetworks: WalletNetwork[] = [
    { 
      id: '1', 
      name: 'Ethereum', 
      currency: 'USDT', 
      balance: 3050, 
      fees: '15 USDT', 
      processingTime: 'Instant'
    },
    { 
      id: '2', 
      name: 'Polygon', 
      currency: 'USDT', 
      balance: 1200, 
      fees: '2 USDT', 
      processingTime: '1-3 minutes'
    },
    { 
      id: '3', 
      name: 'Binance Smart Chain', 
      currency: 'USDT', 
      balance: 850, 
      fees: '1 USDT', 
      processingTime: '30 seconds'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      loadFunds();
    }
  }, [isOpen]);

  useEffect(() => {
    if (walletNetworks.length > 0 && !selectedNetwork) {
      setSelectedNetwork(walletNetworks[0]);
    }
  }, [selectedNetwork]);

  const loadFunds = async () => {
    try {
      setLoading(true);
      const data = await fundService.getAllFunds();
      setFunds(data);
      if (data.length > 0) {
        setSelectedFund(data[0]);
      }
    } catch (error) {
      console.error('Failed to load funds:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleProceed = () => {
    if (selectedFund && amount && selectedNetwork) {
      const numericAmount = parseFloat(amount);
      if (numericAmount >= selectedFund.minimumInvestment) {
        onProceed({
          selectedFund,
          amount: numericAmount,
          selectedNetwork
        });
      }
    }
  };

  const isValidAmount = amount && parseFloat(amount) >= (selectedFund?.minimumInvestment || 0) && parseFloat(amount) <= (selectedNetwork?.balance || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment</h2>
          <p className="text-gray-600">Choose where you want to invest:</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Fund Selection */}
            <div className="space-y-4 mb-8">
              {funds.map((fund) => (
                <label key={fund.id} className="block">
                  <div className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                    selectedFund?.id === fund.id 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="fundSelection"
                        value={fund.id}
                        checked={selectedFund?.id === fund.id}
                        onChange={() => setSelectedFund(fund)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900">{fund.name}</h3>
                          <span className="text-xs text-gray-500">Min: {fund.minimumInvestment} USDT</span>
                        </div>
                        <p className="text-lg font-bold text-green-600 mb-1">
                          YTD: +{fund.performanceROI.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-600">{fund.shortDescription}</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Amount Input */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter amount:</h3>
              
              {/* Wallet Balance */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Wallet balance:</span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedNetwork?.balance || 0} USDT
                </span>
              </div>

              {/* Amount Input Field */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Enter amount to invest:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    min={selectedFund?.minimumInvestment || 0}
                    max={selectedNetwork?.balance || 0}
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    USDT
                  </span>
                </div>
                {selectedFund && amount && parseFloat(amount) < selectedFund.minimumInvestment && (
                  <p className="text-red-500 text-sm mt-1">
                    Minimum investment is {selectedFund.minimumInvestment} USDT
                  </p>
                )}
                {amount && selectedNetwork && parseFloat(amount) > selectedNetwork.balance && (
                  <p className="text-red-500 text-sm mt-1">
                    Insufficient balance
                  </p>
                )}
              </div>

              {/* Network Selection */}
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2">Select wallet network:</label>
                <div className="space-y-2">
                  {walletNetworks.map((network) => (
                    <label key={network.id} className="block">
                      <div className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedNetwork?.id === network.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="networkSelection"
                            value={network.id}
                            checked={selectedNetwork?.id === network.id}
                            onChange={() => setSelectedNetwork(network)}
                            className="text-blue-600"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{network.name}</span>
                              <span className="text-sm text-gray-600">
                                {network.balance} {network.currency}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Fee: {network.fees}</span>
                              <span>{network.processingTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleProceed}
                disabled={!isValidAmount}
                className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* Support Section */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Having issues?</p>
              <button className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <HelpCircle className="w-4 h-4" />
                Contact support
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 