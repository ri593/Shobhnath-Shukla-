
import { UserProfile, RiskTolerance, Asset, ComplianceAlert, TradeDocument } from './types';

export const MOCK_USER: UserProfile = {
  name: 'Alex Johnson',
  age: 32,
  investmentGoal: 'Long-term wealth accumulation for early retirement and family security.',
  riskTolerance: RiskTolerance.MODERATE,
  horizonYears: 25,
  regionsOfInterest: ['North America', 'Europe', 'APAC']
};

export const MOCK_ASSETS: Asset[] = [
  { symbol: 'VOO', name: 'S&P 500 ETF', type: 'ETF', allocation: 45, value: 85000, change24h: 0.8 },
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock', allocation: 15, value: 28000, change24h: 1.2 },
  { symbol: 'BTC', name: 'Bitcoin', type: 'Crypto', allocation: 10, value: 19000, change24h: -2.4 },
  { symbol: 'BND', name: 'Total Bond Market', type: 'Bond', allocation: 20, value: 38000, change24h: -0.1 },
  { symbol: 'GLD', name: 'SPDR Gold Shares', type: 'Commodity', allocation: 10, value: 19000, change24h: 0.5 },
];

export const MARKET_TRENDS_CHART = [
  { month: 'Jan', volume: 4500 },
  { month: 'Feb', volume: 5200 },
  { month: 'Mar', volume: 4800 },
  { month: 'Apr', volume: 6100 },
  { month: 'May', volume: 5900 },
  { month: 'Jun', volume: 7200 },
];

export const MOCK_COMPLIANCE: ComplianceAlert[] = [
  { id: '1', severity: 'High', timestamp: '2h ago', region: 'EU', message: 'New textile regulations pending implementation.' },
  { id: '2', severity: 'Medium', timestamp: '5h ago', region: 'APAC', message: 'Customs port delay in Singapore due to weather.' },
  { id: '3', severity: 'Low', timestamp: '1d ago', region: 'Global', message: 'Quarterly compliance review successfully completed.' }
];

export const MOCK_DOCUMENTS: TradeDocument[] = [
  { id: 'DOC-001', type: 'Bill of Lading', status: 'Verified', date: '2024-05-15', blockchainId: '0x742d...4f12' },
  { id: 'DOC-002', type: 'Certificate of Origin', status: 'Pending', date: '2024-05-16', blockchainId: '0x911a...3c88' },
  { id: 'DOC-003', type: 'Commercial Invoice', status: 'Verified', date: '2024-05-14', blockchainId: '0x32b5...e1f9' }
];
