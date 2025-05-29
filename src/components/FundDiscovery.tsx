import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Shield, 
  DollarSign,
  Eye,
  Star,
  ArrowUpRight
} from 'lucide-react';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { FundService } from '../services/FundService';
import type { Fund } from '../types';
import { RiskLevel } from '../types';

export default function FundDiscovery() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<RiskLevel | ''>('');
  const [sortBy, setSortBy] = useState<'name' | 'roi' | 'aum'>('roi');
  const [loading, setLoading] = useState(true);

  const fundService = container.get<FundService>(TYPES.FundService);

  useEffect(() => {
    loadFunds();
  }, []);

  useEffect(() => {
    filterAndSortFunds();
  }, [funds, searchQuery, selectedRiskLevel, sortBy]);

  const loadFunds = async () => {
    try {
      const data = await fundService.getAllFunds();
      setFunds(data);
    } catch (error) {
      console.error('Failed to load funds:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortFunds = () => {
    let filtered = [...funds];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(fund =>
        fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.assets.some(asset => 
          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply risk level filter
    if (selectedRiskLevel) {
      filtered = filtered.filter(fund => fund.riskLevel === selectedRiskLevel);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'roi':
          return b.performanceROI - a.performanceROI;
        case 'aum':
          return b.totalAUM - a.totalAUM;
        default:
          return 0;
      }
    });

    setFilteredFunds(filtered);
  };

  const getRiskLevelColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.LOW:
        return 'bg-green-100 text-green-800';
      case RiskLevel.BALANCED:
        return 'bg-yellow-100 text-yellow-800';
      case RiskLevel.HIGH:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelIcon = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.LOW:
        return <Shield className="w-4 h-4" />;
      case RiskLevel.BALANCED:
        return <TrendingUp className="w-4 h-4" />;
      case RiskLevel.HIGH:
        return <ArrowUpRight className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fund Discovery</h1>
        <p className="text-gray-600">Explore and invest in our curated selection of funds</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search funds, assets, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Risk Level Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value as RiskLevel | '')}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Risk Levels</option>
              <option value={RiskLevel.LOW}>Low Risk</option>
              <option value={RiskLevel.BALANCED}>Balanced</option>
              <option value={RiskLevel.HIGH}>High Risk</option>
            </select>
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'roi' | 'aum')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="roi">Sort by ROI</option>
            <option value="name">Sort by Name</option>
            <option value="aum">Sort by AUM</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredFunds.length} of {funds.length} funds
        </p>
      </div>

      {/* Fund Grid */}
      {filteredFunds.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFunds.map((fund) => (
            <div key={fund.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              {/* Fund Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {fund.name}
                  </h3>
                  <Star className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {fund.shortDescription}
                </p>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(fund.riskLevel)}`}>
                    {getRiskLevelIcon(fund.riskLevel)}
                    {fund.riskLevel.charAt(0).toUpperCase() + fund.riskLevel.slice(1)} Risk
                  </span>
                </div>
              </div>

              {/* Fund Metrics */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">12M ROI</p>
                    <p className="text-xl font-bold text-green-600">
                      +{fund.performanceROI.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Current NAV</p>
                    <p className="text-xl font-bold text-gray-900">
                      ${fund.currentNAV.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Min Investment</p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${fund.minimumInvestment.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">AUM</p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(fund.totalAUM / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>

                {/* Asset Allocation Preview */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Top Assets</p>
                  <div className="flex flex-wrap gap-1">
                    {fund.assets.slice(0, 3).map((asset, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {asset.symbol} {asset.percentage}%
                      </span>
                    ))}
                    {fund.assets.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{fund.assets.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <DollarSign className="w-4 h-4" />
                  Invest
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No funds found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or clearing filters to see more results.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRiskLevel('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 