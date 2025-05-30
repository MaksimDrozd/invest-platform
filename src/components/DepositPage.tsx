import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Info, Headphones } from 'lucide-react';

export default function DepositPage() {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const networks = [
    'Ethereum',
    'BSC',
    'Polygon',
    'Tron'
  ];

  // Generate a sample deposit address based on network
  const getDepositAddress = (network: string) => {
    const addresses = {
      'Ethereum': 'bc1q9ez7w3f6p7gyw6ur7kyxw2tg9v3az91lsh6e3',
      'BSC': '0x742d35cc6645c0532351bf5db0e9a72642424fd9',
      'Polygon': '0x891a5b07e8f09f6c9a51ff0c99b1ac7e8f3a9b4c',
      'Tron': 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE'
    };
    return addresses[network as keyof typeof addresses] || '';
  };

  const handleProceed = () => {
    if (!selectedNetwork) return;
    // Here you would handle the deposit logic
    console.log('Proceeding with deposit on', selectedNetwork);
    navigate('/app/wallet'); // Navigate back to wallet or show deposit address
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Deposit</h1>
        </div>

        {/* Network Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select network:
          </label>
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent flex items-center justify-between"
            >
              <span className={selectedNetwork ? "text-gray-900" : "text-gray-500"}>
                {selectedNetwork || "Select network"}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {networks.map((network) => (
                  <button
                    key={network}
                    onClick={() => {
                      setSelectedNetwork(network);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedNetwork === network ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {network}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info Message */}
        <div className="flex items-start gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
          <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600">
            Each network generates a unique deposit address.
          </p>
        </div>

        {/* Show additional fields only after network selection */}
        {selectedNetwork && (
          <>
            {/* Deposit Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Deposit address:
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={getDepositAddress(selectedNetwork)}
                  readOnly
                  className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Minimum Deposit Info */}
            <div className="flex items-start gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Minimum deposit: 10 USDT. Make sure to cover network fees.
              </p>
            </div>

            {/* Network Fee Information */}
            <div className="mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Network fee:</span>
                <span className="text-sm font-medium text-gray-900">0.5 USDT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Platform receives:</span>
                <span className="text-sm font-medium text-gray-900">49.5 USDT</span>
              </div>
            </div>

            {/* Network Fee Variation Info */}
            <div className="flex items-start gap-3 mb-8 p-3 bg-gray-50 rounded-lg">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Network fee may vary depending on congestion.
              </p>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleProceed}
            disabled={!selectedNetwork}
            className={`w-full py-3 px-4 rounded-lg transition-colors font-medium ${
              selectedNetwork 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed
          </button>
          
          <button
            onClick={handleCancel}
            className="w-full py-3 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>

        {/* Support Section */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">Having issues?</p>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Headphones className="w-4 h-4" />
            Contact support
          </button>
        </div>
      </div>
    </div>
  );
} 