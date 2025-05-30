import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InvestmentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  investmentDetails: {
    amount: number;
    fundName: string;
  };
}

export default function InvestmentSuccessModal({ 
  isOpen, 
  onClose, 
  investmentDetails 
}: InvestmentSuccessModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToTransactionHistory = () => {
    onClose();
    navigate('/app/transactions');
  };

  const handleReturnToDashboard = () => {
    onClose();
    navigate('/app/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Success!</h3>
            <p className="text-gray-600">
              Your request for investing <span className="font-semibold">{investmentDetails.amount} USDT</span> into{' '}
              <span className="font-semibold">{investmentDetails.fundName}</span> was successfully registered.
            </p>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>As soon as our administrator approves your request,</p>
            <p>your portfolio will be updated.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleGoToTransactionHistory}
            className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            View transaction history
          </button>
          <button
            onClick={handleReturnToDashboard}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            Go to dashboard
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