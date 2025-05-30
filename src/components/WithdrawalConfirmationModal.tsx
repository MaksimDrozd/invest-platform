import { HelpCircle, Info } from 'lucide-react';
import type { WithdrawalAddress, WalletNetwork } from '../types';

interface WithdrawalConfirmationModalProps {
  isOpen: boolean;
  onProceed: () => void;
  onBack: () => void;
  withdrawalData: {
    selectedNetwork: WalletNetwork;
    address: WithdrawalAddress;
    amount: number;
  };
}

export default function WithdrawalConfirmationModal({ 
  isOpen, 
  onProceed, 
  onBack, 
  withdrawalData 
}: WithdrawalConfirmationModalProps) {
  if (!isOpen) return null;

  const { selectedNetwork, address, amount } = withdrawalData;
  
  // Calculate fees and final amount
  const networkFee = parseFloat(selectedNetwork.fees.split(' ')[0]);
  const platformFeePercentage = 1; // 1%
  const platformFee = amount * (platformFeePercentage / 100);
  const totalFees = networkFee + platformFee;
  const finalAmount = amount - totalFees;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Withdrawal</h2>
        </div>

        {/* Summary Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Summary:</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Withdrawal amount:</span>
              <span className="text-sm font-medium text-gray-900">
                {amount} {selectedNetwork.currency}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Network fee:</span>
              <span className="text-sm font-medium text-gray-900">
                {selectedNetwork.fees} (varies)
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Platform fee:</span>
              <span className="text-sm font-medium text-gray-900">
                {platformFeePercentage}% ({platformFee.toFixed(2)} {selectedNetwork.currency})
              </span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-900">You will receive:</span>
              <span className="text-sm font-bold text-gray-900">
                ≈{finalAmount.toFixed(2)} {selectedNetwork.currency}
              </span>
            </div>
          </div>

          {/* Information Notice */}
          <div className="mt-6">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600">
                The amounts displayed are approximate and may vary.
              </p>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-3">
            <div>
              <span className="text-xs text-gray-500">Network:</span>
              <div className="text-sm font-medium text-gray-900">{selectedNetwork.name}</div>
            </div>
            
            <div>
              <span className="text-xs text-gray-500">To Address:</span>
              <div className="text-sm font-medium text-gray-900 break-all">{address.address}</div>
            </div>
            
            <div>
              <span className="text-xs text-gray-500">Estimated Processing Time:</span>
              <div className="text-sm font-medium text-gray-900">{selectedNetwork.processingTime}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={onProceed}
            className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
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