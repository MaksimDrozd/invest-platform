import { injectable } from 'inversify';

export interface CryptoAsset {
  id: number;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume24h: number;
  percentChange24h: number;
  percentChange7d: number;
  percentChange30d: number;
  lastUpdated: string;
  logo?: string;
}

export interface PriceHistoryPoint {
  timestamp: number;
  price: number;
}

export interface FundCryptoAsset extends CryptoAsset {
  allocation: number; // Percentage allocation in the fund
  quantity: number; // Quantity held in the fund
  value: number; // Total value of this asset in the fund
}

@injectable()
export class CoinMarketCapService {
  // For demo purposes, we'll use mock data since we can't make real API calls from the frontend
  private mockCryptoData: Record<string, CryptoAsset> = {
    'BTC': {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43250.50,
      marketCap: 849870000000,
      volume24h: 15632000000,
      percentChange24h: 2.45,
      percentChange7d: -1.23,
      percentChange30d: 12.67,
      lastUpdated: new Date().toISOString(),
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
    },
    'ETH': {
      id: 1027,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2580.75,
      marketCap: 310450000000,
      volume24h: 8547000000,
      percentChange24h: 1.82,
      percentChange7d: -3.45,
      percentChange30d: 8.92,
      lastUpdated: new Date().toISOString(),
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
    },
    'BNB': {
      id: 1839,
      name: 'BNB',
      symbol: 'BNB',
      price: 315.25,
      marketCap: 47180000000,
      volume24h: 1234000000,
      percentChange24h: 0.95,
      percentChange7d: 2.15,
      percentChange30d: 15.43,
      lastUpdated: new Date().toISOString(),
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
    },
    'ADA': {
      id: 2010,
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.485,
      marketCap: 17200000000,
      volume24h: 425000000,
      percentChange24h: -1.25,
      percentChange7d: 4.67,
      percentChange30d: 22.15,
      lastUpdated: new Date().toISOString(),
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png'
    }
  };

  async getCryptoAssets(symbols: string[]): Promise<CryptoAsset[]> {
    // In a real implementation, this would make an API call to CoinMarketCap
    // For demo purposes, we return mock data
    return symbols.map(symbol => this.mockCryptoData[symbol]).filter(Boolean);
  }

  async getCryptoAsset(symbol: string): Promise<CryptoAsset | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockCryptoData[symbol] || null;
  }

  async getPriceHistory(symbol: string, days: number = 30): Promise<PriceHistoryPoint[]> {
    // Generate mock historical data
    const asset = this.mockCryptoData[symbol];
    if (!asset) return [];

    const points: PriceHistoryPoint[] = [];
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    for (let i = days; i >= 0; i--) {
      const timestamp = now - (i * dayMs);
      // Generate realistic price variation
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const price = asset.price * (1 + variation * (i / days));
      points.push({ timestamp, price });
    }

    return points;
  }

  async getFundCryptoAssets(fundId: string): Promise<FundCryptoAsset[]> {
    // Mock fund composition based on fund type
    const fundCompositions: Record<string, Array<{symbol: string, allocation: number, quantity: number}>> = {
      'classic': [
        { symbol: 'BTC', allocation: 40, quantity: 0.23 },
        { symbol: 'ETH', allocation: 35, quantity: 5.42 },
        { symbol: 'BNB', allocation: 15, quantity: 19.05 },
        { symbol: 'ADA', allocation: 10, quantity: 1030.93 }
      ],
      'classb': [
        { symbol: 'ETH', allocation: 50, quantity: 8.35 },
        { symbol: 'BTC', allocation: 30, quantity: 0.14 },
        { symbol: 'BNB', allocation: 20, quantity: 25.40 }
      ],
      'classc': [
        { symbol: 'BTC', allocation: 60, quantity: 0.18 },
        { symbol: 'ETH', allocation: 25, quantity: 3.87 },
        { symbol: 'ADA', allocation: 15, quantity: 970.10 }
      ]
    };

    const composition = fundCompositions[fundId.toLowerCase()] || fundCompositions['classic'];
    const cryptoAssets = await this.getCryptoAssets(composition.map(c => c.symbol));
    
    return cryptoAssets.map((asset, index) => {
      const comp = composition[index];
      const value = asset.price * comp.quantity;
      
      return {
        ...asset,
        allocation: comp.allocation,
        quantity: comp.quantity,
        value
      };
    });
  }

  async getFundTotalValue(fundId: string): Promise<number> {
    const assets = await this.getFundCryptoAssets(fundId);
    return assets.reduce((total, asset) => total + asset.value, 0);
  }

  async getFundValueHistory(fundId: string, days: number = 30): Promise<PriceHistoryPoint[]> {
    const assets = await this.getFundCryptoAssets(fundId);
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    const points: PriceHistoryPoint[] = [];
    
    for (let i = days; i >= 0; i--) {
      const timestamp = now - (i * dayMs);
      let totalValue = 0;
      
      // Calculate total fund value for this day
      for (const asset of assets) {
        // Generate realistic price variation for historical data
        const variation = (Math.random() - 0.5) * 0.08; // ±4% variation
        const historicalPrice = asset.price * (1 + variation * (i / days));
        totalValue += historicalPrice * asset.quantity;
      }
      
      points.push({ timestamp, price: totalValue });
    }
    
    return points;
  }
} 