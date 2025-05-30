import { useState, useEffect } from 'react';
import { X, HelpCircle, Info } from 'lucide-react';
import type { UserFundBalance } from '../types';

interface FundSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (selectedFund: UserFundBalance) => void;
  onBack: () => void;
}

export default function FundSelectionModal({ isOpen, onClose, onProceed, onBack }: FundSelectionModalProps) {
  const [selectedFund, setSelectedFund] = useState<UserFundBalance | null>(null);

  // Mock data for user's fund balances available for withdrawal
  const userFundBalances: UserFundBalance[] = [
    { fundId: 'fund-a', fundName: 'Fund A', availableForWithdrawal: 3560, currency: 'USDT' },
    { fundId: 'fund-b', fundName: 'Fund B', availableForWithdrawal: 340, currency: 'USDT' },
    { fundId: 'fund-c', fundName: 'Fund C', availableForWithdrawal: 2400, currency: 'USDT' },
  ];

  // Set default selection to Fund A
  useEffect(() => {
    if (userFundBalances.length > 0 && !selectedFund) {
      setSelectedFund(userFundBalances[0]);
    }
  }, [userFundBalances, selectedFund]);

  if (!isOpen) return null;

  const handleProceed = () => {
    if (selectedFund) {
      onProceed(selectedFund);
    }
  };

  const handleFundSelect = (fund: UserFundBalance) => {
    setSelectedFund(fund);
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
          <p className="text-gray-600">Select the fund:</p>
        </div>

        {/* Fund Options */}
        <div className="space-y-4 mb-6">
          {userFundBalances.map((fund) => (
            <label key={fund.fundId} className="block">
              <div className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                selectedFund?.fundId === fund.fundId 
                  ? 'border-gray-900 bg-gray-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="fundSelection"
                    value={fund.fundId}
                    checked={selectedFund?.fundId === fund.fundId}
                    onChange={() => handleFundSelect(fund)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-700 mb-1">{fund.fundName}</h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {fund.availableForWithdrawal} {fund.currency}
                    </p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Information Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700">
                The amounts displayed are amounts available to withdraw.
              </p>
              <p className="text-sm text-gray-700 mt-1">
                Fund balance and amount available to withdraw may differ.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleProceed}
            disabled={!selectedFund}
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