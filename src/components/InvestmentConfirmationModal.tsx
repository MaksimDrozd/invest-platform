import { HelpCircle } from 'lucide-react';
import type { Fund, WalletNetwork } from '../types';

interface InvestmentConfirmationModalProps {
  isOpen: boolean;
  onProceed: () => void;
  onBack: () => void;
  investmentData: {
    selectedFund: Fund;
    amount: number;
    selectedNetwork: WalletNetwork;
  };
}

export default function InvestmentConfirmationModal({ 
  isOpen, 
  onProceed, 
  onBack, 
  investmentData 
}: InvestmentConfirmationModalProps) {
  if (!isOpen) return null;

  const { selectedFund, amount, selectedNetwork } = investmentData;
  
  // Calculate fees and investment details
  const entryFee = (amount * selectedFund.entryFee) / 100;
  const networkFee = parseFloat(selectedNetwork.fees.split(' ')[0]);
  const netInvestmentAmount = amount - entryFee;
  const units = netInvestmentAmount / selectedFund.currentNAV;
  
  // Calculate portfolio allocation (simplified)
  const portfolioValue = 12480; // Mock current portfolio value
  const newAllocation = (amount / (portfolioValue + amount)) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment</h2>
          <p className="text-gray-600 mb-4">
            You're investing <span className="font-semibold">{amount} USDT</span> into:
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900">{selectedFund.name}</h3>
          </div>
        </div>

        {/* Investment Details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Estimated annual ROI:</span>
            <span className="text-sm font-semibold text-green-600">
              +{selectedFund.performanceROI.toFixed(1)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">New fund allocation:</span>
            <span className="text-sm font-semibold text-gray-900">
              {newAllocation.toFixed(1)}% of portfolio
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Fees:</span>
            <span className="text-sm font-semibold text-gray-900">
              ${entryFee.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Execution time:</span>
            <span className="text-sm font-semibold text-gray-900">
              Instant
            </span>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <h4 className="font-medium text-gray-900 mb-3">Fee Breakdown:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Investment amount:</span>
              <span className="text-gray-900">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Entry fee ({selectedFund.entryFee}%):</span>
              <span className="text-gray-900">${entryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Network fee:</span>
              <span className="text-gray-900">${networkFee.toFixed(2)}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-medium">
              <span className="text-gray-900">Net investment:</span>
              <span className="text-gray-900">${netInvestmentAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Fund units to receive:</span>
              <span>{units.toFixed(4)} units @ ${selectedFund.currentNAV}/unit</span>
            </div>
          </div>
        </div>

        {/* Network Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Network:</span>
              <span className="font-medium text-gray-900">{selectedNetwork.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing time:</span>
              <span className="font-medium text-gray-900">{selectedNetwork.processingTime}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={onProceed}
            className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Confirm Investment
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Back
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