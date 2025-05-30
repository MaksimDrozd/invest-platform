import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { CoinMarketCapService } from '../services/CoinMarketCapService';
import type { FundCryptoAsset, PriceHistoryPoint } from '../services/CoinMarketCapService';

interface FundDetailsProps {
  fundId: string;
  fundName: string;
  onBack: () => void;
}

interface TooltipData {
  x: number;
  y: number;
  price: number;
  timestamp: number;
  visible: boolean;
}

export default function FundDetails({ fundId, fundName, onBack }: FundDetailsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [cryptoAssets, setCryptoAssets] = useState<FundCryptoAsset[]>([]);
  const [valueHistory, setValueHistory] = useState<PriceHistoryPoint[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [tooltip, setTooltip] = useState<TooltipData>({
    x: 0, y: 0, price: 0, timestamp: 0, visible: false
  });
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const chartRef = useRef<SVGSVGElement>(null);

  const coinMarketCapService = container.get<CoinMarketCapService>(TYPES.CoinMarketCapService);
  const periods = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

  const periodToDays: Record<string, number> = {
    '1D': 1,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    'ALL': 730
  };

  useEffect(() => {
    loadFundData();
  }, [fundId, selectedPeriod]);

  useEffect(() => {
    // Animate chart appearance
    if (valueHistory.length > 0) {
      setAnimationProgress(0);
      const animation = setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 100) {
            clearInterval(animation);
            return 100;
          }
          return prev + 2;
        });
      }, 20);
      return () => clearInterval(animation);
    }
  }, [valueHistory]);

  const loadFundData = async () => {
    setLoading(true);
    setAnimationProgress(0);
    try {
      const [assets, history, total] = await Promise.all([
        coinMarketCapService.getFundCryptoAssets(fundId),
        coinMarketCapService.getFundValueHistory(fundId, periodToDays[selectedPeriod]),
        coinMarketCapService.getFundTotalValue(fundId)
      ]);

      setCryptoAssets(assets);
      setValueHistory(history);
      setTotalValue(total);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load fund data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPrice = (price: number) => {
    if (price < 1) {
      return price.toFixed(4);
    }
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getPercentageColor = (percentage: number) => {
    return percentage >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getPercentageIcon = (percentage: number) => {
    return percentage >= 0 
      ? <TrendingUp className="w-4 h-4" />
      : <TrendingDown className="w-4 h-4" />;
  };

  const calculateDayChange = () => {
    if (valueHistory.length < 2) return 0;
    const current = valueHistory[valueHistory.length - 1].price;
    const previous = valueHistory[valueHistory.length - 2].price;
    return ((current - previous) / previous) * 100;
  };

  const handleChartMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (valueHistory.length === 0 || !chartRef.current) return;

    const rect = chartRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    
    const width = 600;
    const padding = 20;
    
    // Calculate which point we're closest to
    const relativeX = (x - padding) / (width - 2 * padding);
    const pointIndex = Math.round(relativeX * (valueHistory.length - 1));
    
    if (pointIndex >= 0 && pointIndex < valueHistory.length) {
      const point = valueHistory[pointIndex];
      setHoveredPoint(pointIndex);
      setTooltip({
        x: event.clientX,
        y: event.clientY - 60,
        price: point.price,
        timestamp: point.timestamp,
        visible: true
      });
    }
  };

  const handleChartMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
    setHoveredPoint(null);
  };

  const handlePointClick = (pointData: { x: number; y: number; point: PriceHistoryPoint; index: number }) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    setTooltip({
      x: pointData.x + rect.left,
      y: pointData.y + rect.top - 60,
      price: pointData.point.price,
      timestamp: pointData.point.timestamp,
      visible: true
    });
  };

  const renderChart = () => {
    if (valueHistory.length === 0) return null;

    const minValue = Math.min(...valueHistory.map(p => p.price));
    const maxValue = Math.max(...valueHistory.map(p => p.price));
    const range = maxValue - minValue;
    
    const width = 600;
    const height = 200;
    const padding = 20;

    const points = valueHistory.map((point, index) => {
      const x = padding + (index / (valueHistory.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((point.price - minValue) / range) * (height - 2 * padding);
      return { x, y, point, index };
    });

    const animatedPoints = points.slice(0, Math.floor((animationProgress / 100) * points.length));
    const pathPoints = animatedPoints.map(p => `${p.x},${p.y}`).join(' ');
    const areaPoints = animatedPoints.length > 0 
      ? `${padding},${height - padding} ${pathPoints} ${animatedPoints[animatedPoints.length - 1]?.x || padding},${height - padding}`
      : '';

    return (
      <div className="relative">
        <svg 
          ref={chartRef}
          width={width} 
          height={height} 
          className="w-full h-64 cursor-crosshair"
          onMouseMove={handleChartMouseMove}
          onMouseLeave={handleChartMouseLeave}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Grid lines */}
          <g stroke="#e5e7eb" strokeWidth="1" opacity="0.5">
            {[1, 2, 3, 4].map(i => (
              <line 
                key={i} 
                x1={padding} 
                y1={padding + (i * (height - 2 * padding) / 5)} 
                x2={width - padding} 
                y2={padding + (i * (height - 2 * padding) / 5)} 
              />
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <line 
                key={`v-${i}`} 
                x1={padding + (i * (width - 2 * padding) / 9)} 
                y1={padding} 
                x2={padding + (i * (width - 2 * padding) / 9)} 
                y2={height - padding} 
              />
            ))}
          </g>
          
          {/* Area under curve */}
          {areaPoints && (
            <polygon
              points={areaPoints}
              fill="url(#chartGradient)"
              className="transition-all duration-300"
            />
          )}
          
          {/* Main line */}
          {pathPoints && (
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              points={pathPoints}
              className="transition-all duration-300"
              filter={hoveredPoint !== null ? "url(#glow)" : undefined}
            />
          )}
          
          {/* Interactive points */}
          {animatedPoints.map((pointData, index) => {
            const isHovered = hoveredPoint === pointData.index;
            return (
              <circle 
                key={index}
                cx={pointData.x} 
                cy={pointData.y} 
                r={isHovered ? 6 : 4} 
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-200 cursor-pointer hover:fill-blue-600"
                style={{
                  opacity: isHovered ? 1 : 0.7,
                  transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                  transformOrigin: `${pointData.x}px ${pointData.y}px`
                }}
                onClick={() => handlePointClick(pointData)}
              />
            );
          })}
          
          {/* Crosshair */}
          {hoveredPoint !== null && animatedPoints[hoveredPoint] && (
            <g stroke="#3b82f6" strokeWidth="1" opacity="0.6" strokeDasharray="4,4">
              <line 
                x1={animatedPoints[hoveredPoint].x} 
                y1={padding} 
                x2={animatedPoints[hoveredPoint].x} 
                y2={height - padding} 
              />
              <line 
                x1={padding} 
                y1={animatedPoints[hoveredPoint].y} 
                x2={width - padding} 
                y2={animatedPoints[hoveredPoint].y} 
              />
            </g>
          )}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4 pointer-events-none">
          {[maxValue, maxValue * 0.8, maxValue * 0.6, maxValue * 0.4, maxValue * 0.2, minValue].map((value, index) => (
            <span key={index}>${(value / 1000).toFixed(1)}k</span>
          ))}
        </div>
        
        {/* X-axis labels */}
        <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-gray-500 px-8 pointer-events-none">
          {valueHistory.length > 0 && (
            <>
              <span>{new Date(valueHistory[0].timestamp).toLocaleDateString()}</span>
              <span>{new Date(valueHistory[Math.floor(valueHistory.length * 0.25)].timestamp).toLocaleDateString()}</span>
              <span>{new Date(valueHistory[Math.floor(valueHistory.length * 0.5)].timestamp).toLocaleDateString()}</span>
              <span>{new Date(valueHistory[Math.floor(valueHistory.length * 0.75)].timestamp).toLocaleDateString()}</span>
              <span>{new Date(valueHistory[valueHistory.length - 1].timestamp).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>
    );
  };

  const dayChange = calculateDayChange();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Tooltip */}
      {tooltip.visible && (
        <div 
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none transform -translate-x-1/2"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-semibold">{formatCurrency(tooltip.price)}</div>
          <div className="text-gray-300 text-xs">
            {new Date(tooltip.timestamp).toLocaleDateString()} {new Date(tooltip.timestamp).toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{fundName}</h1>
            <p className="text-sm text-gray-600">Fund Details</p>
          </div>
        </div>
        <button
          onClick={loadFundData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Fund Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-2">Total Fund Value</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
          <div className={`flex items-center gap-1 mt-1 text-sm ${getPercentageColor(dayChange)}`}>
            {getPercentageIcon(dayChange)}
            <span>{dayChange >= 0 ? '+' : ''}{dayChange.toFixed(2)}% (24h)</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-2">Number of Assets</p>
          <p className="text-2xl font-bold text-gray-900">{cryptoAssets.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-2">Largest Holding</p>
          {cryptoAssets.length > 0 && (
            <>
              <p className="text-2xl font-bold text-gray-900">{cryptoAssets[0].symbol}</p>
              <p className="text-sm text-gray-600">{cryptoAssets[0].allocation}%</p>
            </>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-2">Last Updated</p>
          <p className="text-sm font-medium text-gray-900">
            {lastUpdated.toLocaleTimeString()}
          </p>
          <p className="text-xs text-gray-500">
            {lastUpdated.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Fund Performance</h3>
          <div className="flex items-center gap-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                  selectedPeriod === period
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-64 relative">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : (
            renderChart()
          )}
        </div>
        
        {/* Loading progress bar */}
        {animationProgress < 100 && !loading && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-100"
              style={{ width: `${animationProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Crypto Assets */}
      <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Your Assets</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value (USD)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <RefreshCw className="w-6 h-6 animate-spin text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Loading crypto assets...</p>
                  </td>
                </tr>
              ) : (
                cryptoAssets.map((asset, index) => (
                  <tr 
                    key={asset.symbol} 
                    className="hover:bg-gray-50 transition-colors"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: loading ? 'none' : 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {asset.logo && (
                          <img 
                            src={asset.logo} 
                            alt={asset.name}
                            className="w-8 h-8 rounded-full hover:scale-110 transition-transform"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      ${formatPrice(asset.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-1 text-sm font-medium ${getPercentageColor(asset.percentChange24h)}`}>
                        {getPercentageIcon(asset.percentChange24h)}
                        <span>{asset.percentChange24h >= 0 ? '+' : ''}{asset.percentChange24h.toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <span>{asset.allocation}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${asset.allocation}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {asset.quantity.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 6 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(asset.value)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 