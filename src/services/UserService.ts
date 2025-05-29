import { injectable } from 'inversify';
import type { User, Notification, RiskProfile, ApiResponse } from '../types';
import { NotificationType, KYCStatus, RiskLevel } from '../types';

@injectable()
export class UserService {
  private notifications: Notification[] = [];
  private riskProfiles: Map<string, RiskProfile> = new Map();

  async getUserById(userId: string): Promise<User | null> {
    // Demo implementation - replace with real API
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user.id === userId) {
        return user;
      }
    }
    return null;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notifications
      .filter(notification => notification.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<void>> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      return { success: true, message: 'Notification marked as read' };
    }
    return { success: false, error: 'Notification not found' };
  }

  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string
  ): Promise<Notification> {
    const notification: Notification = {
      id: Date.now().toString(),
      userId,
      type,
      title,
      message,
      isRead: false,
      createdAt: new Date()
    };

    this.notifications.push(notification);
    return notification;
  }

  async updateKYCStatus(userId: string, status: KYCStatus): Promise<ApiResponse<void>> {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      user.kycStatus = status;
      localStorage.setItem('user', JSON.stringify(user));

      // Create notification
      let title = '';
      let message = '';
      
      switch (status) {
        case KYCStatus.APPROVED:
          title = 'KYC Approved';
          message = 'Your identity verification has been approved. You can now access all platform features.';
          break;
        case KYCStatus.REJECTED:
          title = 'KYC Rejected';
          message = 'Your identity verification was rejected. Please contact support for more information.';
          break;
        case KYCStatus.PENDING:
          title = 'KYC Under Review';
          message = 'Your identity verification is being reviewed. We will notify you once complete.';
          break;
      }

      if (title && message) {
        await this.createNotification(userId, NotificationType.KYC_UPDATE, title, message);
      }

      return { success: true, message: 'KYC status updated' };
    } catch {
      return { success: false, error: 'Failed to update KYC status' };
    }
  }

  async submitRiskProfile(userId: string, answers: Record<string, string>): Promise<ApiResponse<RiskProfile>> {
    try {
      // Simple risk scoring logic
      let score = 0;
      const scoringRules: Record<string, Record<string, number>> = {
        'investment_experience': {
          'none': 1,
          'beginner': 2,
          'intermediate': 3,
          'advanced': 4,
          'expert': 5
        },
        'risk_tolerance': {
          'very_low': 1,
          'low': 2,
          'medium': 3,
          'high': 4,
          'very_high': 5
        },
        'investment_timeline': {
          'short_term': 1,
          'medium_term': 3,
          'long_term': 5
        },
        'volatility_comfort': {
          'very_uncomfortable': 1,
          'uncomfortable': 2,
          'neutral': 3,
          'comfortable': 4,
          'very_comfortable': 5
        }
      };

      Object.entries(answers).forEach(([question, answer]) => {
        const questionScore = scoringRules[question]?.[answer] || 0;
        score += questionScore;
      });

      // Determine risk level based on score
      let riskLevel: RiskLevel;
      if (score <= 8) {
        riskLevel = RiskLevel.LOW;
      } else if (score <= 16) {
        riskLevel = RiskLevel.BALANCED;
      } else {
        riskLevel = RiskLevel.HIGH;
      }

      const riskProfile: RiskProfile = {
        id: Date.now().toString(),
        userId,
        type: riskLevel,
        score,
        questionnaire: Object.entries(answers).map(([question, answer]) => ({
          id: question,
          question,
          answer,
          score: scoringRules[question]?.[answer] || 0
        })),
        completedAt: new Date(),
        version: '1.0'
      };

      this.riskProfiles.set(userId, riskProfile);

      // Update user profile
      const user = await this.getUserById(userId);
      if (user) {
        user.riskProfile = riskProfile;
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Create notification
      await this.createNotification(
        userId,
        NotificationType.SECURITY,
        'Risk Profile Updated',
        `Your risk profile has been set to ${riskLevel.toUpperCase()}.`
      );

      return {
        success: true,
        data: riskProfile,
        message: 'Risk profile submitted successfully'
      };
    } catch {
      return {
        success: false,
        error: 'Failed to submit risk profile'
      };
    }
  }

  async getRiskProfile(userId: string): Promise<RiskProfile | null> {
    return this.riskProfiles.get(userId) || null;
  }

  async getUserStats(userId: string): Promise<{
    totalInvestments: number;
    totalWithdrawals: number;
    accountAge: number;
    lastActivity: Date;
  }> {
    // Demo implementation
    console.log('Getting stats for user:', userId);
    return {
      totalInvestments: 5,
      totalWithdrawals: 2,
      accountAge: 120, // days
      lastActivity: new Date()
    };
  }

  async updateUserSettings(
    userId: string, 
    settings: {
      language?: 'en' | 'ar';
      timezone?: string;
      emailNotifications?: boolean;
      smsNotifications?: boolean;
    }
  ): Promise<ApiResponse<User>> {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      if (settings.language) user.language = settings.language;
      if (settings.timezone) user.timezone = settings.timezone;

      localStorage.setItem('user', JSON.stringify(user));

      return {
        success: true,
        data: user,
        message: 'Settings updated successfully'
      };
    } catch {
      return {
        success: false,
        error: 'Failed to update settings'
      };
    }
  }

  async getUnreadNotificationCount(userId: string): Promise<number> {
    const notifications = await this.getUserNotifications(userId);
    return notifications.filter(n => !n.isRead).length;
  }

  // Initialize demo notifications for testing
  async initializeDemoNotifications(userId: string): Promise<void> {
    if (this.notifications.length === 0) {
      const demoNotifications: Omit<Notification, 'id' | 'createdAt'>[] = [
        {
          userId,
          type: NotificationType.KYC_UPDATE,
          title: 'KYC Approved',
          message: 'Your identity verification has been successfully completed.',
          isRead: false
        },
        {
          userId,
          type: NotificationType.TRANSACTION,
          title: 'Deposit Confirmed',
          message: 'Your USDT deposit of $5,000 has been confirmed.',
          isRead: false
        },
        {
          userId,
          type: NotificationType.FUND_UPDATE,
          title: 'Portfolio Update',
          message: 'Your Conservative Growth Fund has gained +2.5% this week.',
          isRead: true
        },
        {
          userId,
          type: NotificationType.SECURITY,
          title: 'New Login Detected',
          message: 'We detected a login from a new device. If this wasn\'t you, please secure your account.',
          isRead: true
        }
      ];

      demoNotifications.forEach((notificationData, index) => {
        const notification: Notification = {
          ...notificationData,
          id: (Date.now() + index).toString(),
          createdAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)) // Spread over days
        };
        this.notifications.push(notification);
      });
    }
  }
} 