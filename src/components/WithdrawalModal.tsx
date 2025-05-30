import { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (withdrawalType: 'wallet' | 'fund') => void;
}

export default function WithdrawalModal({ isOpen, onClose, onProceed }: WithdrawalModalProps) {
  const [selectedType, setSelectedType] = useState<'wallet' | 'fund'>('wallet');

  if (!isOpen) return null;

  const handleProceed = () => {
    onProceed(selectedType);
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
          <p className="text-gray-600">Select the type of withdrawal:</p>
        </div>

        {/* Withdrawal Options */}
        <div className="space-y-4 mb-8">
          {/* Your wallet (instant) */}
          <label className="block">
            <div className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
              selectedType === 'wallet' 
                ? 'border-gray-900 bg-gray-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="withdrawalType"
                  value="wallet"
                  checked={selectedType === 'wallet'}
                  onChange={(e) => setSelectedType(e.target.value as 'wallet')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Your wallet (instant)</h3>
                  <p className="text-sm text-gray-600">
                    Withdraw directly from your on-platform wallet. Instantly processed.
                  </p>
                </div>
              </div>
            </div>
          </label>

          {/* Fund wallet (requires approval) */}
          <label className="block">
            <div className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
              selectedType === 'fund' 
                ? 'border-gray-900 bg-gray-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="withdrawalType"
                  value="fund"
                  checked={selectedType === 'fund'}
                  onChange={(e) => setSelectedType(e.target.value as 'fund')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Fund wallet (requires approval)</h3>
                  <p className="text-sm text-gray-600">
                    Request withdrawal from your allocated funds. Subject to review.
                  </p>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleProceed}
            className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
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
      </div>
    </div>
  );
} 