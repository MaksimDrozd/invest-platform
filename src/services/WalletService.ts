import { injectable } from 'inversify';
import type { Wallet, WalletBalance, WalletAddress, Transaction, ApiResponse, WithdrawalForm } from '../types';
import { TransactionType, TransactionStatus } from '../types';

@injectable()
export class WalletService {
  private wallets: Map<string, Wallet> = new Map();
  private transactions: Transaction[] = [];

  async getWallet(userId: string): Promise<Wallet> {
    if (!this.wallets.has(userId)) {
      // Create default wallet for new user
      const wallet: Wallet = {
        id: `wallet_${userId}`,
        userId,
        balances: [
          {
            token: 'USDT',
            network: 'Ethereum',
            available: 5000,
            locked: 2500,
            pendingWithdrawal: 0
          },
          {
            token: 'USDT',
            network: 'BSC',
            available: 2000,
            locked: 0,
            pendingWithdrawal: 500
          },
          {
            token: 'ETH',
            network: 'Ethereum',
            available: 1.5,
            locked: 0.5,
            pendingWithdrawal: 0
          }
        ],
        addresses: []
      };
      this.wallets.set(userId, wallet);
    }
    
    return this.wallets.get(userId)!;
  }

  async getWalletBalance(userId: string): Promise<WalletBalance[]> {
    const wallet = await this.getWallet(userId);
    return wallet.balances;
  }

  async getWalletSummary(userId: string): Promise<{
    totalBalance: number;
    available: number;
    inUse: number;
    pendingWithdrawal: number;
  }> {
    const balances = await this.getWalletBalance(userId);
    
    // Convert to USD for summary (simplified conversion)
    const conversionRates: Record<string, number> = {
      'USDT': 1,
      'ETH': 2500,
      'BTC': 45000
    };

    let available = 0;
    let inUse = 0;
    let pendingWithdrawal = 0;

    balances.forEach(balance => {
      const rate = conversionRates[balance.token] || 1;
      available += balance.available * rate;
      inUse += balance.locked * rate;
      pendingWithdrawal += balance.pendingWithdrawal * rate;
    });

    const totalBalance = available + inUse + pendingWithdrawal;

    return {
      totalBalance,
      available,
      inUse,
      pendingWithdrawal
    };
  }

  async addWalletAddress(userId: string, address: WalletAddress): Promise<ApiResponse<WalletAddress>> {
    try {
      const wallet = await this.getWallet(userId);
      
      // Check for duplicate address
      const existingAddress = wallet.addresses.find(
        addr => addr.address === address.address && addr.network === address.network
      );
      
      if (existingAddress) {
        return {
          success: false,
          error: 'Address already exists for this network'
        };
      }

      const newAddress: WalletAddress = {
        ...address,
        id: Date.now().toString(),
        createdAt: new Date(),
        isVerified: false
      };

      wallet.addresses.push(newAddress);
      this.wallets.set(userId, wallet);

      return {
        success: true,
        data: newAddress,
        message: 'Address added successfully'
      };
    } catch {
      return {
        success: false,
        error: 'Failed to add address'
      };
    }
  }

  async getWalletAddresses(userId: string): Promise<WalletAddress[]> {
    const wallet = await this.getWallet(userId);
    return wallet.addresses;
  }

  async removeWalletAddress(userId: string, addressId: string): Promise<ApiResponse<void>> {
    try {
      const wallet = await this.getWallet(userId);
      const addressIndex = wallet.addresses.findIndex(addr => addr.id === addressId);
      
      if (addressIndex === -1) {
        return {
          success: false,
          error: 'Address not found'
        };
      }

      wallet.addresses.splice(addressIndex, 1);
      this.wallets.set(userId, wallet);

      return {
        success: true,
        message: 'Address removed successfully'
      };
    } catch {
      return {
        success: false,
        error: 'Failed to remove address'
      };
    }
  }

  async initiateWithdrawal(userId: string, withdrawalData: WithdrawalForm): Promise<ApiResponse<Transaction>> {
    try {
      const wallet = await this.getWallet(userId);
      
      // Find balance for the network
      const balance = wallet.balances.find(
        b => b.network === withdrawalData.network
      );

      if (!balance || balance.available < withdrawalData.amount) {
        return {
          success: false,
          error: 'Insufficient balance'
        };
      }

      // Verify address exists
      const address = wallet.addresses.find(
        addr => addr.address === withdrawalData.address && addr.network === withdrawalData.network
      );

      if (!address || !address.isVerified) {
        return {
          success: false,
          error: 'Invalid or unverified address'
        };
      }

      const transaction: Transaction = {
        id: Date.now().toString(),
        userId,
        type: TransactionType.WITHDRAWAL,
        amount: withdrawalData.amount,
        token: 'USDT', // Assuming USDT for now
        network: withdrawalData.network,
        status: TransactionStatus.PENDING,
        fee: 5, // Mock fee
        createdAt: new Date()
      };

      // Update balance
      balance.available -= withdrawalData.amount;
      balance.pendingWithdrawal += withdrawalData.amount;
      this.wallets.set(userId, wallet);

      // Store transaction
      this.transactions.push(transaction);

      return {
        success: true,
        data: transaction,
        message: 'Withdrawal request submitted'
      };
    } catch {
      return {
        success: false,
        error: 'Failed to process withdrawal'
      };
    }
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return this.transactions
      .filter(tx => tx.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getTransactionById(transactionId: string): Promise<Transaction | null> {
    return this.transactions.find(tx => tx.id === transactionId) || null;
  }

  async updateTransactionStatus(
    transactionId: string, 
    status: TransactionStatus, 
    txHash?: string
  ): Promise<ApiResponse<Transaction>> {
    try {
      const transaction = await this.getTransactionById(transactionId);
      if (!transaction) {
        return {
          success: false,
          error: 'Transaction not found'
        };
      }

      transaction.status = status;
      if (txHash) {
        transaction.txHash = txHash;
      }
      if (status === TransactionStatus.CONFIRMED) {
        transaction.completedAt = new Date();
      }

      return {
        success: true,
        data: transaction,
        message: 'Transaction updated successfully'
      };
    } catch {
      return {
        success: false,
        error: 'Failed to update transaction'
      };
    }
  }

  async getDepositAddress(_userId: string, network: string): Promise<ApiResponse<string>> {
    // Demo implementation - in real app, generate or retrieve from custody provider
    const mockAddresses: Record<string, string> = {
      'Ethereum': '0x742d35Cc6d4C0532C6fE7a2b5c2F127c9e58Bb2F',
      'BSC': '0x8E9b2c1234567890abcdef1234567890abcdef12',
      'Polygon': '0x1234567890abcdef1234567890abcdef12345678'
    };

    const address = mockAddresses[network];
    if (!address) {
      return {
        success: false,
        error: 'Network not supported'
      };
    }

    return {
      success: true,
      data: address,
      message: `Deposit address for ${network}`
    };
  }
} 