import { HelpCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TransactionDetails {
  txHash?: string;
  amount: number;
  currency: string;
  network: string;
  address: string;
  isInstantWithdrawal?: boolean;
}

interface WithdrawalSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionDetails?: TransactionDetails;
}

export default function WithdrawalSuccessModal({ 
  isOpen, 
  onClose, 
  transactionDetails 
}: WithdrawalSuccessModalProps) {
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

  const handleViewOnExplorer = () => {
    if (transactionDetails?.txHash) {
      // This would be dynamic based on network
      const explorerUrl = `https://etherscan.io/tx/${transactionDetails.txHash}`;
      window.open(explorerUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Withdraw</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Success!</h3>
            {transactionDetails ? (
              <div className="space-y-2">
                <p className="text-gray-600">
                  {transactionDetails.amount} {transactionDetails.currency} have been successfully withdrawn from your wallet.
                </p>
                {transactionDetails.txHash && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Transaction Hash:</span>
                        <div className="font-mono text-xs break-all">{transactionDetails.txHash}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Network:</span>
                        <span className="ml-2 font-medium">{transactionDetails.network}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">To Address:</span>
                        <div className="font-mono text-xs break-all">{transactionDetails.address}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600">
                Your request has been submitted. Awaiting approval.
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          {transactionDetails?.txHash && (
            <button
              onClick={handleViewOnExplorer}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View on Explorer
            </button>
          )}
          <button
            onClick={handleGoToTransactionHistory}
            className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Go to Transaction history
          </button>
          <button
            onClick={handleReturnToDashboard}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Go to Dashboard
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