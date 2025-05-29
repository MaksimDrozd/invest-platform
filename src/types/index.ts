export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  accountType: UserAccountType;
  kycStatus: KYCStatus;
  accountStatus: AccountStatus;
  riskProfile?: RiskProfile;
  twoFactorEnabled: boolean;
  createdAt: Date;
  lastLogin?: Date;
  timezone: string;
  language: 'en' | 'ar';
  roles: UserRole[];
}

export enum UserAccountType {
  INDIVIDUAL = 'individual',
  GROUP = 'group',
  INSTITUTIONAL = 'institutional'
}

export enum KYCStatus {
  NOT_STARTED = 'not_started',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export enum AccountStatus {
  ACTIVE = 'active',
  PENDING_ACTIVATION = 'pending_activation',
  FROZEN = 'frozen',
  DELETED = 'deleted'
}

export enum UserRole {
  USER = 'user',
  SUPER_ADMIN = 'super_admin',
  PLATFORM_MANAGER = 'platform_manager',
  USER_ADMIN = 'user_admin',
  CONTENT_ADMIN = 'content_admin',
  SUPPORT_ADMIN = 'support_admin',
  COMPLIANCE_ADMIN = 'compliance_admin',
  ANALYST = 'analyst'
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
  coverUrl?: string;
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: Track[];
  owner: User;
  isPublic: boolean;
  createdAt: Date;
}

export interface JamSession {
  id: string;
  name: string;
  host: User;
  participants: User[];
  currentTrack?: Track;
  playlist: Playlist;
  isActive: boolean;
  createdAt: Date;
}

export interface Wallet {
  id: string;
  userId: string;
  balances: WalletBalance[];
  addresses: WalletAddress[];
}

export interface WalletBalance {
  token: string;
  network: string;
  available: number;
  locked: number;
  pendingWithdrawal: number;
}

export interface WalletAddress {
  id: string;
  label: string;
  address: string;
  network: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Fund {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  status: FundStatus;
  riskLevel: RiskLevel;
  minimumInvestment: number;
  entryFee: number;
  withdrawalFee: number;
  currentNAV: number;
  totalAUM: number;
  performanceROI: number;
  assets: FundAsset[];
  createdAt: Date;
  publishedAt?: Date;
}

export enum FundStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  CLOSED = 'closed',
  ARCHIVED = 'archived'
}

export enum RiskLevel {
  LOW = 'low',
  BALANCED = 'balanced',
  HIGH = 'high'
}

export interface FundAsset {
  symbol: string;
  percentage: number;
  type: string;
}

export interface Investment {
  id: string;
  userId: string;
  fundId: string;
  amount: number;
  units: number;
  entryNAV: number;
  entryFee: number;
  status: InvestmentStatus;
  createdAt: Date;
}

export enum InvestmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed'
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  token: string;
  network?: string;
  status: TransactionStatus;
  txHash?: string;
  fundId?: string;
  fee?: number;
  createdAt: Date;
  completedAt?: Date;
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  INVESTMENT = 'investment',
  FUND_WITHDRAWAL = 'fund_withdrawal',
  INTERNAL_TRANSFER = 'internal_transfer'
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface RiskProfile {
  id: string;
  userId: string;
  type: RiskLevel;
  score: number;
  questionnaire: RiskQuestion[];
  completedAt: Date;
  version: string;
}

export interface RiskQuestion {
  id: string;
  question: string;
  answer: string;
  score: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export enum NotificationType {
  KYC_UPDATE = 'kyc_update',
  TRANSACTION = 'transaction',
  SECURITY = 'security',
  FUND_UPDATE = 'fund_update',
  ADMIN_MESSAGE = 'admin_message'
}

export interface Portfolio {
  userId: string;
  totalInvested: number;
  currentValue: number;
  unrealizedPnL: number;
  roi: number;
  allocations: PortfolioAllocation[];
  lastSync: Date;
}

export interface PortfolioAllocation {
  fundId: string;
  fundName: string;
  units: number;
  value: number;
  percentage: number;
  roi: number;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  fundId: string;
  units: number;
  estimatedAmount: number;
  actualAmount?: number;
  status: WithdrawalStatus;
  reason?: string;
  createdAt: Date;
  processedAt?: Date;
  processedBy?: string;
}

export enum WithdrawalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed'
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginForm {
  email: string;
  password: string;
  twoFactorCode?: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  accountType: UserAccountType;
  acceptTerms: boolean;
}

export interface InvestmentForm {
  fundId: string;
  amount: number;
  network: string;
}

export interface WithdrawalForm {
  address: string;
  amount: number;
  network: string;
} 