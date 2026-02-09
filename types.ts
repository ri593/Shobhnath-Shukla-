
export enum RiskTolerance {
  CONSERVATIVE = 'Conservative',
  MODERATE = 'Moderate',
  AGGRESSIVE = 'Aggressive'
}

export interface Asset {
  symbol: string;
  name: string;
  type: 'Stock' | 'Crypto' | 'Bond' | 'Commodity' | 'ETF';
  allocation: number;
  value: number;
  change24h: number;
}

export interface UserProfile {
  name: string;
  age: number;
  investmentGoal: string;
  riskTolerance: RiskTolerance;
  horizonYears: number;
  regionsOfInterest: string[];
}

export interface MarketTrend {
  asset: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  reasoning: string;
  predictedMove: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface IndexData {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface EducationResource {
  title: string;
  category: string;
  description: string;
  type: 'Article' | 'Video' | 'Strategy';
}

export interface StockComparisonData {
  symbol: string;
  price: string;
  marketCap: string;
  ytd: string;
  revenue: string;
  performance: number[];
}

export interface Notification {
  id: string;
  type: 'alert' | 'news' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// Added for trade network components
export type TradeRole = 'Manufacturer' | 'Logistics' | 'Distributor' | 'Retailer' | 'Supplier' | 'Freight Forwarder';

export interface TradePartner {
  id: string;
  name: string;
  country: string;
  role: TradeRole | string;
  reliabilityScore: number;
  specialization: string;
  isVerified: boolean;
}

// Added for intelligence components
export interface MarketIntelligence {
  region: string;
  trend: string;
  opportunity: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
}

// Added for compliance components
export interface ComplianceAlert {
  id: string;
  severity: 'High' | 'Medium' | 'Low';
  timestamp: string;
  region: string;
  message: string;
}

export interface TradeDocument {
  id: string;
  type: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  date: string;
  blockchainId: string;
  aiVerification?: {
    isConsistent: boolean;
    findings: string[];
    confidence: number;
  };
}
