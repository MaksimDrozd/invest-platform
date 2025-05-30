import { useState } from 'react';
import { X, HelpCircle, Info, ChevronDown } from 'lucide-react';
import type { WalletNetwork } from '../types';

interface WalletNetworkSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (selectedNetwork: WalletNetwork) => void;
  onBack: () => void;
}

export default function WalletNetworkSelectionModal({ 
  isOpen, 
  onClose, 
  onProceed, 
  onBack 
}: WalletNetworkSelectionModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<WalletNetwork | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock wallet network data
  const walletNetworks: WalletNetwork[] = [
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      balance: 12340, 
      currency: 'USDT',
      fees: '0.8 USDT',
      processingTime: '~5 minutes'
    },
    { 
      id: 'tron', 
      name: 'TRON', 
      balance: 8750, 
      currency: 'USDT',
      fees: '0.1 USDT',
      processingTime: '~2 minutes'
    },
    { 
      id: 'bsc', 
      name: 'BSC', 
      balance: 5600, 
      currency: 'USDT',
      fees: '0.2 USDT',
      processingTime: '~3 minutes'
    },
  ];

  if (!isOpen) return null;

  const handleProceed = () => {
    if (selectedNetwork) {
      onProceed(selectedNetwork);
    }
  };

  const handleNetworkSelect = (network: WalletNetwork) => {
    setSelectedNetwork(network);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Withdrawal</h2>
        </div>

        {/* Wallet Balance Display */}
        {selectedNetwork && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wallet withdrawal:</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Wallet balance</div>
              <div className="text-xl font-bold text-gray-900">
                {selectedNetwork.balance.toLocaleString()} {selectedNetwork.currency}
              </div>
            </div>
            
            {/* Information Notice */}
            <div className="flex items-start gap-2 mt-3">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600">
                  The amount displayed is the amount available to withdraw.
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Wallet balance and amount available to withdraw may differ.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Network Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select withdrawal network:
          </label>
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <div className="text-left">
                {selectedNetwork ? (
                  <div className="text-sm font-medium text-gray-900">{selectedNetwork.name}</div>
                ) : (
                  <div className="text-sm text-gray-500">Select a network</div>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {walletNetworks.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => handleNetworkSelect(network)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="text-sm font-medium text-gray-900">{network.name}</div>
                    <div className="text-xs text-gray-500">
                      Balance: {network.balance.toLocaleString()} {network.currency}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Network Info */}
          {selectedNetwork && (
            <div className="mt-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Networks determine available tokens, fees & processing time.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleProceed}
            disabled={!selectedNetwork}
            className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed
          </button>
          <button
            onClick={onBack}
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
      </div>
    </div>
  );
} 