import { useState, useEffect } from 'react';
import { X, HelpCircle, Info, ChevronDown, Plus } from 'lucide-react';
import type { WithdrawalAddress, WalletNetwork } from '../types';

interface WalletWithdrawalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (data: { selectedNetwork: WalletNetwork; address: WithdrawalAddress; amount: number }) => void;
  onBack: () => void;
  selectedNetwork: WalletNetwork;
}

export default function WalletWithdrawalFormModal({ 
  isOpen, 
  onClose, 
  onProceed, 
  onBack, 
  selectedNetwork 
}: WalletWithdrawalFormModalProps) {
  const [selectedAddress, setSelectedAddress] = useState<WithdrawalAddress | null>(null);
  const [amount, setAmount] = useState<string>('150');
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);

  // Mock withdrawal addresses - in real app this would come from user's saved addresses
  const withdrawalAddresses: WithdrawalAddress[] = [
    {
      id: '1',
      label: 'Ethereum',
      address: 'bc1qcr7w3fcp7qywtwxvf2g9x9v919txfff663',
      network: 'Ethereum'
    },
    // Can add more addresses here
  ];

  // Set default address if available
  useEffect(() => {
    if (withdrawalAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(withdrawalAddresses[0]);
    }
  }, [withdrawalAddresses, selectedAddress]);

  if (!isOpen) return null;

  const availableAmount = selectedNetwork.balance;
  const currentAmount = parseFloat(amount) || 0;

  const handleProceed = () => {
    if (selectedAddress && currentAmount > 0 && currentAmount <= availableAmount) {
      onProceed({
        selectedNetwork,
        address: selectedAddress,
        amount: currentAmount
      });
    }
  };

  const handlePercentageClick = (percentage: number) => {
    const calculatedAmount = (availableAmount * percentage / 100).toFixed(0);
    setAmount(calculatedAmount);
  };

  const handleMaxClick = () => {
    setAmount(availableAmount.toString());
  };

  const isValidAmount = currentAmount > 0 && currentAmount <= availableAmount;

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

        {/* Address Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Select address:</label>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
              <Plus className="w-4 h-4" />
              Add new wallet
            </button>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsAddressDropdownOpen(!isAddressDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <div className="text-left">
                {selectedAddress ? (
                  <>
                    <div className="text-sm font-medium text-gray-900">{selectedAddress.label}</div>
                    <div className="text-xs text-gray-500">{selectedAddress.address}</div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">Select an address</div>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isAddressDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {withdrawalAddresses.map((address) => (
                  <button
                    key={address.id}
                    onClick={() => {
                      setSelectedAddress(address);
                      setIsAddressDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="text-sm font-medium text-gray-900">{address.label}</div>
                    <div className="text-xs text-gray-500">{address.address}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-2 mt-3">
            <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              Only whitelisted addresses are allowed for security reasons.
            </p>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Enter the amount:</label>
            <div className="text-sm text-gray-600">
              Available to withdraw: <span className="font-medium">{availableAmount.toLocaleString()} {selectedNetwork.currency}</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              {selectedNetwork.currency}
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleMaxClick}
              className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              MAX
            </button>
            <button
              onClick={() => handlePercentageClick(25)}
              className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              25%
            </button>
            <button
              onClick={() => handlePercentageClick(50)}
              className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              50%
            </button>
            <button
              onClick={() => handlePercentageClick(75)}
              className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              75%
            </button>
          </div>

          {/* Amount Validation */}
          {amount && !isValidAmount && (
            <p className="text-xs text-red-600 mt-2">
              {currentAmount > availableAmount 
                ? `Amount exceeds available balance of ${availableAmount} ${selectedNetwork.currency}`
                : 'Please enter a valid amount'
              }
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleProceed}
            disabled={!selectedAddress || !isValidAmount}
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