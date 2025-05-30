import { useState, useRef } from 'react';
import { 
  Plus,
  Filter,
  MoreVertical,
  BarChart3,
  CheckCircle,
  Clock,
  Pause
} from 'lucide-react';
import FundDetails from './FundDetails';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [selectedFund, setSelectedFund] = useState<{id: string, name: string} | null>(null);
  const [chartTooltip, setChartTooltip] = useState<{
    x: number;
    y: number;
    value: number;
    date: string;
    visible: boolean;
  }>({
    x: 0, y: 0, value: 0, date: '', visible: false
  });
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  const tabs = [
    { id: 'overview', label: 'Portfolio overview' },
    { id: 'classic', label: 'Classic' },
    { id: 'classb', label: 'Class B' },
    { id: 'classc', label: 'Class C' },
    { id: 'watchlist', label: 'Watchlist' }
  ];

  const periods = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

  const portfolioSummary = {
    totalValue: 12480.37,
    totalInvested: 12100,
    unrealizedProfit: 380.37,
    roi: 12.7,
    roiChange: 12.7
  };

  const funds = [
    {
      name: 'Classic',
      value: 5000.00,
      roi: 18.2,
      risk: 'Medium',
      status: 'Active',
      color: 'bg-green-500'
    },
    {
      name: 'Class B',
      value: 4300.00,
      roi: 24.5,
      risk: 'High',
      status: 'Active',
      color: 'bg-blue-500'
    },
    {
      name: 'Class C',
      value: 3180.37,
      roi: 6.2,
      risk: 'Low',
      status: 'Active',
      color: 'bg-red-500'
    }
  ];

  const activities = [
    { date: 'Apr 25', action: 'Invested', fund: 'Classic', amount: '$500', status: 'Done' },
    { date: 'Apr 24', action: 'Deposited', fund: 'Class B - Classic', amount: '$250', status: 'Done' },
    { date: 'Apr 23', action: 'Withdrawal', fund: 'Class C', amount: '$200', status: 'Pending' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Pause className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleTabClick = (tabId: string) => {
    if (tabId !== 'overview') {
      // For fund tabs (Classic, Class B, Class C), show fund details
      const fundMap: Record<string, {id: string, name: string}> = {
        'classic': { id: 'classic', name: 'Classic' },
        'classb': { id: 'classb', name: 'Class B' },
        'classc': { id: 'classc', name: 'Class C' }
      };
      
      if (fundMap[tabId]) {
        setSelectedFund(fundMap[tabId]);
        return;
      }
    }
    setActiveTab(tabId);
    setSelectedFund(null);
  };

  const handleViewFund = (fundName: string) => {
    const fundId = fundName.toLowerCase().replace(/\s+/g, '');
    setSelectedFund({ id: fundId, name: fundName });
  };

  const handleBackToPortfolio = () => {
    setSelectedFund(null);
    setActiveTab('overview');
  };

  const handleChartMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!chartRef.current) return;

    const rect = chartRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    
    const width = 400;
    const padding = 20;
    
    // Calculate which point we're closest to
    const relativeX = (x - padding) / (width - 2 * padding);
    const pointIndex = Math.round(relativeX * (portfolioData.length - 1));
    
    if (pointIndex >= 0 && pointIndex < portfolioData.length) {
      const point = portfolioData[pointIndex];
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Mock data for portfolio chart
  const portfolioData = [
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

  // If a fund is selected, show FundDetails
  if (selectedFund) {
    return (
      <FundDetails
        fundId={selectedFund.id}
        fundName={selectedFund.name}
        onBack={handleBackToPortfolio}
      />
    );
  }

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

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Withdraw from fund
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Portfolio Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-2">Total portfolio value</p>
            <p className="text-2xl font-bold text-gray-900">${portfolioSummary.totalValue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">(+{portfolioSummary.roiChange}%)</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-2">Total invested:</p>
            <p className="text-2xl font-bold text-gray-900">${portfolioSummary.totalInvested.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-2">Unrealized Profit:</p>
            <p className="text-2xl font-bold text-green-600">+${portfolioSummary.unrealizedProfit.toFixed(2)}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-2">ROI:</p>
            <p className="text-2xl font-bold text-green-600">+{portfolioSummary.roi}%</p>
          </div>
        </div>
      </div>

      {/* Performance Chart & Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Chart */}
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
          
          {/* Chart */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center relative">
            <div className="absolute top-4 left-4 text-xs text-gray-500 z-10 pointer-events-none">
              <div>Apr 17, 2025</div>
              <div>Portfolio value: $13,000</div>
              <div>Day change: +$210.15</div>
              <div>Total ROI: +6,465</div>
            </div>
            
            {/* Interactive Chart */}
            <svg 
              ref={chartRef}
              className="w-full h-full cursor-crosshair" 
              viewBox="0 0 400 250"
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
            >
              <defs>
                <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                </linearGradient>
                <filter id="portfolioGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {(() => {
                // Calculate chart coordinates based on actual data
                const minValue = Math.min(...portfolioData.map(d => d.value));
                const maxValue = Math.max(...portfolioData.map(d => d.value));
                const range = maxValue - minValue;
                const chartHeight = 150; // from y=50 to y=200
                const chartTop = 50;
                
                const points = portfolioData.map((dataPoint, index) => {
                  const x = 20 + (index / (portfolioData.length - 1)) * 360;
                  const normalizedValue = (dataPoint.value - minValue) / range;
                  const y = chartTop + chartHeight - (normalizedValue * chartHeight);
                  return { x, y, value: dataPoint.value, date: dataPoint.date };
                });
                
                const pathPoints = points.map(p => `${p.x},${p.y}`).join(' ');
                const areaPoints = `20,200 ${pathPoints} 380,200`;
                
                return (
                  <>
                    {/* Grid lines */}
                    <g stroke="#e5e7eb" strokeWidth="1" opacity="0.5">
                      <line x1="20" y1="50" x2="380" y2="50"/>
                      <line x1="20" y1="100" x2="380" y2="100"/>
                      <line x1="20" y1="150" x2="380" y2="150"/>
                      <line x1="20" y1="200" x2="380" y2="200"/>
                      {/* Vertical grid lines */}
                      {portfolioData.map((_, index) => {
                        const x = 20 + (index / (portfolioData.length - 1)) * 360;
                        return (
                          <line 
                            key={index}
                            x1={x} 
                            y1="50" 
                            x2={x} 
                            y2="200" 
                            opacity="0.3"
                          />
                        );
                      })}
                    </g>
                    
                    {/* Area under curve */}
                    <polygon
                      points={areaPoints}
                      fill="url(#portfolioGradient)"
                      className="transition-all duration-300"
                    />
                    
                    {/* Main line */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      points={pathPoints}
                      className="transition-all duration-300"
                      filter={hoveredChartPoint !== null ? "url(#portfolioGlow)" : undefined}
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
                          y1="50" 
                          x2={points[hoveredChartPoint].x} 
                          y2="200" 
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
                const minValue = Math.min(...portfolioData.map(d => d.value));
                const maxValue = Math.max(...portfolioData.map(d => d.value));
                const step = (maxValue - minValue) / 5;
                return [
                  `$${(maxValue / 1000).toFixed(1)}k`,
                  `$${((maxValue - step) / 1000).toFixed(1)}k`,
                  `$${((maxValue - 2 * step) / 1000).toFixed(1)}k`,
                  `$${((maxValue - 3 * step) / 1000).toFixed(1)}k`,
                  `$${((maxValue - 4 * step) / 1000).toFixed(1)}k`,
                  `$${(minValue / 1000).toFixed(1)}k`
                ].map((label, index) => (
                  <span key={index}>{label}</span>
                ));
              })()}
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-gray-500 px-8 pointer-events-none">
              {portfolioData.map((point) => (
                <span key={point.date}>{point.date}</span>
              ))}
            </div>
          </div>
        </div>

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
            {/* Pie Chart */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="20" 
                  strokeDasharray="33.33 66.67" 
                  strokeDashoffset="0"
                  className="transition-all duration-1000 hover:stroke-green-600"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="20" 
                  strokeDasharray="33.33 66.67" 
                  strokeDashoffset="-33.33"
                  className="transition-all duration-1000 hover:stroke-blue-600"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="20" 
                  strokeDasharray="33.33 66.67" 
                  strokeDashoffset="-66.66"
                  className="transition-all duration-1000 hover:stroke-red-600"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">33.3%</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              {funds.map((fund) => (
                <div key={fund.name} className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                  <div className={`w-3 h-3 rounded-full ${fund.color} group-hover:scale-110 transition-transform`}></div>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{fund.name}</span>
                  <span className="text-sm font-medium text-gray-900">${fund.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Your Funds */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Your funds</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fund name ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROI ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {funds.map((fund) => (
                <tr key={fund.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${fund.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{fund.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${fund.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    +{fund.roi}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fund.risk}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fund.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewFund(fund.name)}
                      className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Portfolio Activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Portfolio activity</h3>
            <button className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fund ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.fund}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(activity.status)}
                      <span className="text-sm text-gray-900">{activity.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 