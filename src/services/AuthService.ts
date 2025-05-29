import { injectable } from 'inversify';
import type { User, RegisterForm, ApiResponse } from '../types';
import { UserAccountType, KYCStatus, AccountStatus, UserRole } from '../types';

@injectable()
export class AuthService {
  private currentUser: User | null = null;

  async login(email: string, password: string, _twoFactorCode?: string): Promise<User> {
    // Demo implementation - replace with real API
    if (email === 'demo@example.com' && password === 'password') {
      const user: User = {
        id: '1',
        email: 'demo@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        accountType: UserAccountType.INDIVIDUAL,
        kycStatus: KYCStatus.APPROVED,
        accountStatus: AccountStatus.ACTIVE,
        twoFactorEnabled: true,
        createdAt: new Date('2024-01-01'),
        lastLogin: new Date(),
        timezone: 'UTC',
        language: 'en',
        roles: [UserRole.USER]
      };
      
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }

    // Admin demo login
    if (email === 'admin@example.com' && password === 'admin') {
      const admin: User = {
        id: '2',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567891',
        accountType: UserAccountType.INDIVIDUAL,
        kycStatus: KYCStatus.APPROVED,
        accountStatus: AccountStatus.ACTIVE,
        twoFactorEnabled: true,
        createdAt: new Date('2024-01-01'),
        lastLogin: new Date(),
        timezone: 'UTC',
        language: 'en',
        roles: [UserRole.SUPER_ADMIN]
      };
      
      this.currentUser = admin;
      localStorage.setItem('user', JSON.stringify(admin));
      return admin;
    }

    throw new Error('Invalid credentials');
  }

  async register(formData: RegisterForm): Promise<ApiResponse<User>> {
    // Demo implementation - replace with real API
    try {
      const user: User = {
        id: Date.now().toString(),
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        accountType: formData.accountType,
        kycStatus: KYCStatus.NOT_STARTED,
        accountStatus: AccountStatus.PENDING_ACTIVATION,
        twoFactorEnabled: false,
        createdAt: new Date(),
        timezone: 'UTC',
        language: 'en',
        roles: [UserRole.USER]
      };

      return {
        success: true,
        data: user,
        message: 'Registration successful. Please verify your email.'
      };
    } catch (_error) {
      return {
        success: false,
        error: 'Registration failed'
      };
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }

    return null;
  }

  async resetPassword(_email: string): Promise<ApiResponse<void>> {
    // Demo implementation
    return {
      success: true,
      message: 'Password reset link sent to your email'
    };
  }

  async setup2FA(): Promise<ApiResponse<{ qrCode: string; secret: string }>> {
    // Demo implementation
    return {
      success: true,
      data: {
        qrCode: 'data:image/png;base64,demo-qr-code',
        secret: 'JBSWY3DPEHPK3PXP'
      }
    };
  }

  async verify2FA(code: string): Promise<ApiResponse<void>> {
    // Demo implementation
    if (code === '123456') {
      return { success: true, message: '2FA enabled successfully' };
    }
    return { success: false, error: 'Invalid 2FA code' };
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser?.roles.includes(role) || false;
  }

  isAdmin(): boolean {
    return this.hasRole(UserRole.SUPER_ADMIN) || 
           this.hasRole(UserRole.PLATFORM_MANAGER) ||
           this.hasRole(UserRole.USER_ADMIN);
  }

  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      this.currentUser = { ...this.currentUser, ...updates };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      
      return {
        success: true,
        data: this.currentUser,
        message: 'Profile updated successfully'
      };
    } catch (_error) {
      return {
        success: false,
        error: 'Failed to update profile'
      };
    }
  }
} 