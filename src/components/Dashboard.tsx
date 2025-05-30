import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowUp,
  ArrowDown,
  BarChart3,
  TrendingUp
} from 'lucide-react';

interface TooltipData {
  x: number;
  y: number;
  value: number;
  date: string;
  visible: boolean;
}

interface PieTooltipData {
  x: number;
  y: number;
  name: string;
  value: number;
  visible: boolean;
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [chartTooltip, setChartTooltip] = useState<TooltipData>({
    x: 0, y: 0, value: 0, date: '', visible: false
  });
  const [pieTooltip, setPieTooltip] = useState<PieTooltipData>({
    x: 0, y: 0, name: '', value: 0, visible: false
  });
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(null);
  const [hoveredPieSegment, setHoveredPieSegment] = useState<number | null>(null);
  const chartRef = useRef<SVGSVGElement>(null);
  const pieChartRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  const portfolioSummary = {
    totalValue: 12480.37,
    todayChange: 134.20,
    todayChangePercent: 1.09,
    riskProfile: 'Balanced',
    portfolioType: 'Active',
    lastSync: '5 mins ago'
  };

  const assetAllocation = [
    { name: 'Fund A', value: 25, color: '#10b981' },
    { name: 'Fund B', value: 25, color: '#eab308' },
    { name: 'Fund C', value: 25, color: '#3b82f6' },
    { name: 'Fund D', value: 25, color: '#ef4444' }
  ];

  const walletBalance = {
    total: 2915.42,
    available: 1700.00,
    inUse: 1015.42,
    pending: 200.00
  };

  const transactions = [
    { date: 'Apr 25', type: 'Deposit', method: 'via Bank', amount: '$600', positive: true },
    { date: 'Apr 24', type: 'Withdrawal', method: '0.1 ETH', amount: '', positive: false },
    { date: 'Apr 22', type: 'Fund Switch', method: 'From Class B to Classic', amount: '', positive: false },
    { date: 'Apr 20', type: 'Profit Share Distributed', method: '', amount: '+$45', positive: true }
  ];

  const periods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  // Mock data for dashboard chart
  const performanceData = [
    { date: 'Mar 21', value: 11000 },
    { date: 'Mar 25', value: 11500 },
    { date: 'Mar 28', value: 11200 },
    { date: 'Apr 01', value: 12000 },
    { date: 'Apr 05', value: 11800 },
    { date: 'Apr 09', value: 12200 },
    { date: 'Apr 13', value: 12100 },
    { date: 'Apr 17', value: 12400 },
    { date: 'Apr 21', value: 12480 }
  ];

  const handleChartMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!chartRef.current) return;

    const rect = chartRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    
    const width = 400;
    const padding = 20;
    
    // Calculate which point we're closest to
    const relativeX = (x - padding) / (width - 2 * padding);
    const pointIndex = Math.round(relativeX * (performanceData.length - 1));
    
    if (pointIndex >= 0 && pointIndex < performanceData.length) {
      const point = performanceData[pointIndex];
      setHoveredChartPoint(pointIndex);
      setChartTooltip({
        x: event.clientX,
        y: event.clientY - 60,
        value: point.value,
        date: point.date,
        visible: true
      });
    }
  };

  const handleChartMouseLeave = () => {
    setChartTooltip(prev => ({ ...prev, visible: false }));
    setHoveredChartPoint(null);
  };

  const handlePieMouseMove = (event: React.MouseEvent<SVGCircleElement>, fund: typeof assetAllocation[0], index: number) => {
    setHoveredPieSegment(index);
    setPieTooltip({
      x: event.clientX,
      y: event.clientY - 60,
      name: fund.name,
      value: fund.value,
      visible: true
    });
  };

  const handlePieMouseLeave = () => {
    setPieTooltip(prev => ({ ...prev, visible: false }));
    setHoveredPieSegment(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Chart Tooltip */}
      {chartTooltip.visible && (
        <div 
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none transform -translate-x-1/2"
          style={{ left: chartTooltip.x, top: chartTooltip.y }}
        >
          <div className="font-semibold">{formatCurrency(chartTooltip.value)}</div>
          <div className="text-gray-300 text-xs">{chartTooltip.date}</div>
        </div>
      )}

      {/* Pie Chart Tooltip */}
      {pieTooltip.visible && (
        <div 
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none transform -translate-x-1/2"
          style={{ left: pieTooltip.x, top: pieTooltip.y }}
        >
          <div className="font-semibold">{pieTooltip.name}</div>
          <div className="text-gray-300 text-xs">{pieTooltip.value}%</div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium hover:scale-105 transform duration-200">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio summary</h2>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <p className="text-sm text-gray-600 mb-2">Total Value:</p>
            <p className="text-3xl font-bold text-gray-900">${portfolioSummary.totalValue.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                +${portfolioSummary.todayChange} (+{portfolioSummary.todayChangePercent}%)
              </span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <p className="text-sm text-gray-600 mb-1">Risk Profile:</p>
            <p className="text-xl font-bold text-gray-900">{portfolioSummary.riskProfile}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <p className="text-sm text-gray-600 mb-1">Portfolio Type:</p>
            <p className="text-xl font-bold text-gray-900">{portfolioSummary.portfolioType}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <p className="text-sm text-gray-600 mb-1">Last Sync:</p>
            <p className="text-xl font-bold text-gray-900">{portfolioSummary.lastSync}</p>
          </div>
        </div>
      </div>

      {/* Asset Allocation & Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Asset Allocation */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Asset allocation</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            {/* Interactive Pie Chart */}
            <div className="relative w-32 h-32">
              <svg ref={pieChartRef} className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <filter id="pieShadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                {assetAllocation.map((fund, index) => {
                  const isHovered = hoveredPieSegment === index;
                  const strokeDasharray = "25.12 75.36";
                  const strokeDashoffset = -25.12 * index;
                  
                  return (
                    <circle 
                      key={fund.name}
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke={fund.color} 
                      strokeWidth={isHovered ? "22" : "20"}
                      strokeDasharray={strokeDasharray} 
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        filter: isHovered ? "url(#pieShadow)" : undefined,
                        opacity: isHovered ? 1 : 0.8
                      }}
                      onMouseMove={(e) => handlePieMouseMove(e, fund, index)}
                      onMouseLeave={handlePieMouseLeave}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-semibold text-gray-600">25%</span>
              </div>
            </div>
            
            {/* Interactive Legend */}
            <div className="space-y-3">
              {assetAllocation.map((fund, index) => {
                const isHovered = hoveredPieSegment === index;
                return (
                  <div 
                    key={fund.name} 
                    className={`flex items-center gap-3 group cursor-pointer p-2 rounded transition-all duration-200 ${
                      isHovered ? 'bg-gray-50 scale-105' : 'hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => setHoveredPieSegment(index)}
                    onMouseLeave={() => setHoveredPieSegment(null)}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full transition-transform duration-200 ${
                        isHovered ? 'scale-125' : 'group-hover:scale-110'
                      }`}
                      style={{ backgroundColor: fund.color }}
                    ></div>
                    <span className={`text-sm transition-colors duration-200 ${
                      isHovered ? 'text-gray-900 font-medium' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {fund.name}
                    </span>
                    <span className={`text-sm font-medium transition-colors duration-200 ${
                      isHovered ? 'text-gray-900' : 'text-gray-900'
                    }`}>
                      {fund.value}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Performance Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance chart</h3>
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
          
          {/* Interactive Chart */}
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative">
            <div className="absolute top-4 left-4 text-xs text-gray-500 z-10 pointer-events-none">
              <div>Apr 17, 2025</div>
              <div>Portfolio value: $13,000</div>
              <div>Day change: +$210.15</div>
              <div>Total ROI: +6,465</div>
            </div>
            
            <svg 
              ref={chartRef}
              className="w-full h-full cursor-crosshair" 
              viewBox="0 0 400 200"
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
            >
              <defs>
                <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                </linearGradient>
                <filter id="dashboardGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Grid lines */}
              <g stroke="#e5e7eb" strokeWidth="1" opacity="0.5">
                <line x1="20" y1="40" x2="380" y2="40"/>
                <line x1="20" y1="80" x2="380" y2="80"/>
                <line x1="20" y1="120" x2="380" y2="120"/>
                <line x1="20" y1="160" x2="380" y2="160"/>
                {/* Vertical grid lines */}
                {performanceData.map((_, index) => {
                  const x = 20 + (index / (performanceData.length - 1)) * 360;
                  return (
                    <line 
                      key={index}
                      x1={x} 
                      y1="40" 
                      x2={x} 
                      y2="160" 
                      opacity="0.3"
                    />
                  );
                })}
              </g>
              
              {(() => {
                // Calculate chart coordinates based on actual data
                const minValue = Math.min(...performanceData.map(d => d.value));
                const maxValue = Math.max(...performanceData.map(d => d.value));
                const range = maxValue - minValue;
                const chartHeight = 120; // from y=40 to y=160
                const chartTop = 40;
                
                const points = performanceData.map((dataPoint, index) => {
                  const x = 20 + (index / (performanceData.length - 1)) * 360;
                  const normalizedValue = (dataPoint.value - minValue) / range;
                  const y = chartTop + chartHeight - (normalizedValue * chartHeight);
                  return { x, y, value: dataPoint.value, date: dataPoint.date };
                });
                
                const pathPoints = points.map(p => `${p.x},${p.y}`).join(' ');
                const areaPoints = `20,160 ${pathPoints} 380,160`;
                
                return (
                  <>
                    {/* Area under curve */}
                    <polygon
                      points={areaPoints}
                      fill="url(#dashboardGradient)"
                      className="transition-all duration-300"
                    />
                    
                    {/* Main line */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      points={pathPoints}
                      className="transition-all duration-300"
                      filter={hoveredChartPoint !== null ? "url(#dashboardGlow)" : undefined}
                    />
                    
                    {/* Interactive data points */}
                    {points.map((point, index) => {
                      const isHovered = hoveredChartPoint === index;
                      
                      return (
                        <circle 
                          key={index}
                          cx={point.x} 
                          cy={point.y} 
                          r={isHovered ? 6 : 4} 
                          fill="#3b82f6"
                          stroke="white"
                          strokeWidth="2"
                          className="transition-all duration-200 cursor-pointer hover:fill-blue-600"
                          style={{
                            opacity: isHovered ? 1 : 0.7,
                            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                            transformOrigin: `${point.x}px ${point.y}px`
                          }}
                        />
                      );
                    })}
                    
                    {/* Crosshair */}
                    {hoveredChartPoint !== null && points[hoveredChartPoint] && (
                      <g stroke="#3b82f6" strokeWidth="1" opacity="0.6" strokeDasharray="4,4">
                        <line 
                          x1={points[hoveredChartPoint].x} 
                          y1="40" 
                          x2={points[hoveredChartPoint].x} 
                          y2="160" 
                        />
                        <line 
                          x1="20" 
                          y1={points[hoveredChartPoint].y} 
                          x2="380" 
                          y2={points[hoveredChartPoint].y} 
                        />
                      </g>
                    )}
                  </>
                );
              })()}
            </svg>
            
            {/* Y-axis labels */}
            <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4 pointer-events-none">
              {(() => {
                const minValue = Math.min(...performanceData.map(d => d.value));
                const maxValue = Math.max(...performanceData.map(d => d.value));
                const step = (maxValue - minValue) / 4;
                return [
                  `$${(maxValue / 1000).toFixed(1)}k`,
                  `$${((maxValue - step) / 1000).toFixed(1)}k`,
                  `$${((maxValue - 2 * step) / 1000).toFixed(1)}k`,
                  `$${((maxValue - 3 * step) / 1000).toFixed(1)}k`,
                  `$${(minValue / 1000).toFixed(1)}k`
                ].map((label, index) => (
                  <span key={index}>{label}</span>
                ));
              })()}
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-gray-500 px-8 pointer-events-none">
              {performanceData.map((point, index) => (
                <span key={point.date} style={{ opacity: index % 2 === 0 ? 1 : 0 }}>
                  {point.date}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Latest transactions:</h3>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              See full
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {transactions.map((transaction, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm text-gray-600">{transaction.date}</p>
              <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
              {transaction.method && (
                <p className="text-sm text-gray-600">{transaction.method}</p>
              )}
              {transaction.amount && (
                <p className={`text-sm font-medium ${
                  transaction.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Wallet balance:</h3>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Wallet details
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total wallet balance</p>
            <p className="text-xl font-bold text-gray-900">${walletBalance.total.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Available:</p>
            <p className="text-xl font-bold text-gray-900">${walletBalance.available.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">In Use (Invested):</p>
            <p className="text-xl font-bold text-gray-900">${walletBalance.inUse.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Pending Withdrawal:</p>
            <p className="text-xl font-bold text-gray-900">${walletBalance.pending.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors" onClick={() => navigate('/app/deposit')}>
            <div className="flex items-center gap-2 mb-2">
              <Plus className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Add Funds</span>
            </div>
          </button>
          
          <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDown className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Withdraw</span>
            </div>
          </button>
          
          <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Withdraw from fund</span>
            </div>
          </button>
          
          <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-left transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Invest</span>
            </div>
          </button>
        </div>
      </div>

      {/* News & Updates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">News & updates</h3>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              View all
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="w-full h-24 bg-gray-200 rounded-lg mb-3"></div>
              <h4 className="font-medium text-gray-900 mb-2">News heading</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 