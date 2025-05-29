import { injectable } from 'inversify';
import type { Fund, ApiResponse, InvestmentForm, Portfolio, Investment } from '../types';
import { FundStatus, RiskLevel, InvestmentStatus } from '../types';

interface FundPerformanceData {
  date: string;
  nav: number;
  change: number;
}

@injectable()
export class FundService {
  private funds: Fund[] = [
    {
      id: '1',
      name: 'Conservative Growth Fund',
      description: 'A stable fund focused on conservative investments with steady growth potential.',
      shortDescription: 'Stable growth with low risk',
      status: FundStatus.ACTIVE,
      riskLevel: RiskLevel.LOW,
      minimumInvestment: 100,
      entryFee: 1.5,
      withdrawalFee: 0.5,
      currentNAV: 105.5,
      totalAUM: 2500000,
      performanceROI: 8.5,
      assets: [
        { symbol: 'USDT', percentage: 40, type: 'Stablecoin' },
        { symbol: 'ETH', percentage: 35, type: 'Cryptocurrency' },
        { symbol: 'BTC', percentage: 25, type: 'Cryptocurrency' }
      ],
      createdAt: new Date('2024-01-01'),
      publishedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Aggressive DeFi Fund',
      description: 'High-yield DeFi strategies for experienced investors seeking maximum returns.',
      shortDescription: 'High-yield DeFi strategies',
      status: FundStatus.ACTIVE,
      riskLevel: RiskLevel.HIGH,
      minimumInvestment: 500,
      entryFee: 2.0,
      withdrawalFee: 1.0,
      currentNAV: 125.8,
      totalAUM: 1800000,
      performanceROI: 25.8,
      assets: [
        { symbol: 'ETH', percentage: 50, type: 'Cryptocurrency' },
        { symbol: 'LINK', percentage: 20, type: 'Cryptocurrency' },
        { symbol: 'UNI', percentage: 15, type: 'DeFi Token' },
        { symbol: 'USDT', percentage: 15, type: 'Stablecoin' }
      ],
      createdAt: new Date('2024-02-01'),
      publishedAt: new Date('2024-02-15')
    },
    {
      id: '3',
      name: 'Balanced Multi-Asset Fund',
      description: 'Diversified portfolio balancing growth and stability across multiple asset classes.',
      shortDescription: 'Balanced multi-asset approach',
      status: FundStatus.ACTIVE,
      riskLevel: RiskLevel.BALANCED,
      minimumInvestment: 250,
      entryFee: 1.8,
      withdrawalFee: 0.8,
      currentNAV: 112.3,
      totalAUM: 3200000,
      performanceROI: 12.3,
      assets: [
        { symbol: 'BTC', percentage: 30, type: 'Cryptocurrency' },
        { symbol: 'ETH', percentage: 30, type: 'Cryptocurrency' },
        { symbol: 'USDT', percentage: 25, type: 'Stablecoin' },
        { symbol: 'ADA', percentage: 15, type: 'Cryptocurrency' }
      ],
      createdAt: new Date('2024-01-15'),
      publishedAt: new Date('2024-02-01')
    }
  ];

  async getAllFunds(): Promise<Fund[]> {
    return this.funds.filter(fund => fund.status === FundStatus.ACTIVE);
  }

  async getFundById(id: string): Promise<Fund | null> {
    return this.funds.find(fund => fund.id === id) || null;
  }

  async getFundsByRiskLevel(riskLevel: RiskLevel): Promise<Fund[]> {
    return this.funds.filter(fund => 
      fund.riskLevel === riskLevel && fund.status === FundStatus.ACTIVE
    );
  }

  async searchFunds(query: string): Promise<Fund[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.funds.filter(fund => 
      fund.status === FundStatus.ACTIVE &&
      (fund.name.toLowerCase().includes(lowercaseQuery) ||
       fund.description.toLowerCase().includes(lowercaseQuery) ||
       fund.assets.some(asset => asset.symbol.toLowerCase().includes(lowercaseQuery)))
    );
  }

  async investInFund(userId: string, investmentData: InvestmentForm): Promise<ApiResponse<Investment>> {
    try {
      const fund = await this.getFundById(investmentData.fundId);
      if (!fund) {
        return { success: false, error: 'Fund not found' };
      }

      if (investmentData.amount < fund.minimumInvestment) {
        return { 
          success: false, 
          error: `Minimum investment is $${fund.minimumInvestment}` 
        };
      }

      const entryFee = (investmentData.amount * fund.entryFee) / 100;
      const netAmount = investmentData.amount - entryFee;
      const units = netAmount / fund.currentNAV;

      const investment: Investment = {
        id: Date.now().toString(),
        userId,
        fundId: investmentData.fundId,
        amount: investmentData.amount,
        units,
        entryNAV: fund.currentNAV,
        entryFee,
        status: InvestmentStatus.PENDING,
        createdAt: new Date()
      };

      return {
        success: true,
        data: investment,
        message: 'Investment initiated successfully'
      };
    } catch {
      return {
        success: false,
        error: 'Failed to process investment'
      };
    }
  }

  async getUserPortfolio(userId: string): Promise<Portfolio> {
    // Demo implementation - replace with real data
    const mockAllocations = [
      {
        fundId: '1',
        fundName: 'Conservative Growth Fund',
        units: 95.2,
        value: 10050.6,
        percentage: 40.2,
        roi: 8.5
      },
      {
        fundId: '2',
        fundName: 'Aggressive DeFi Fund',
        units: 47.6,
        value: 5988.08,
        percentage: 24.0,
        roi: 25.8
      },
      {
        fundId: '3',
        fundName: 'Balanced Multi-Asset Fund',
        units: 80.1,
        value: 8995.23,
        percentage: 35.8,
        roi: 12.3
      }
    ];

    const totalValue = mockAllocations.reduce((sum, allocation) => sum + allocation.value, 0);
    const totalInvested = 23000; // Mock value

    return {
      userId,
      totalInvested,
      currentValue: totalValue,
      unrealizedPnL: totalValue - totalInvested,
      roi: ((totalValue - totalInvested) / totalInvested) * 100,
      allocations: mockAllocations,
      lastSync: new Date()
    };
  }

  async getFundPerformance(_fundId: string, period: string): Promise<ApiResponse<FundPerformanceData[]>> {
    // Demo implementation - replace with real performance data
    const mockData = [];
    const now = new Date();
    const days = period === '1M' ? 30 : period === '3M' ? 90 : 365;

    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate mock NAV with some volatility
      const baseNAV = 100;
      const volatility = Math.sin(i * 0.1) * 5 + Math.random() * 2;
      const nav = baseNAV + volatility + (i * 0.05);

      mockData.push({
        date: date.toISOString().split('T')[0],
        nav: Number(nav.toFixed(2)),
        change: i > 0 ? Number((volatility * 0.1).toFixed(2)) : 0
      });
    }

    return {
      success: true,
      data: mockData
    };
  }
} 