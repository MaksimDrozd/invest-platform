# Investment Platform

A modern web-based investment platform built with React, TypeScript, and Tailwind CSS. This platform allows users to manage their investment portfolios, explore funds, and handle cryptocurrency wallets.

## ✨ New Dashboard Design

The platform now features a completely redesigned dashboard that matches modern financial interfaces:

- **Dark sidebar navigation** with search functionality
- **Portfolio summary cards** showing key metrics
- **Interactive asset allocation pie chart** 
- **Performance charts** with period selection
- **Transaction history** with detailed view
- **Wallet balance overview** across multiple currencies
- **Quick action buttons** for common operations
- **News & updates section** with latest market information

## Features

### User Management & Authentication
- **Account Registration**: Support for Individual, Group, and Institutional account types
- **Email Verification**: Required email verification during registration
- **2FA Authentication**: SMS-based two-factor authentication
- **KYC/KYB Process**: Identity verification for compliance
- **Role-based Access Control**: Multiple user roles with different permissions

### Investment Management
- **Fund Discovery**: Browse and search investment funds by risk level and performance
- **Portfolio Tracking**: Real-time portfolio value and performance monitoring
- **Investment Execution**: Direct investment in available funds
- **Risk Profiling**: Automated risk assessment questionnaire

### Wallet & Transactions
- **Multi-network Support**: Ethereum, BSC, Polygon networks
- **Balance Management**: Track available, locked, and pending balances
- **Deposit/Withdrawal**: Secure crypto asset management
- **Transaction History**: Complete transaction tracking and status updates

### Dashboard & Analytics
- **Portfolio Overview**: Comprehensive investment dashboard with modern UI
- **Performance Metrics**: ROI, P&L, and allocation tracking with charts
- **Asset Allocation**: Visual pie chart showing fund distribution
- **Notifications**: Real-time updates on transactions and KYC status
- **Quick Actions**: Easy access to common operations

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **State Management**: React Hooks
- **Dependency Injection**: InversifyJS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Notifications**: React Toastify

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd investment-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

**Regular User:**
- Email: `demo@example.com`
- Password: `password`

**Admin User:**
- Email: `admin@example.com`
- Password: `admin`

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard with new design
│   ├── FundDiscovery.tsx # Fund browsing
│   ├── Portfolio.tsx    # Portfolio management
│   ├── Wallet.tsx       # Wallet interface
│   ├── Layout.tsx       # App layout with dark sidebar
│   └── LoginPage.tsx    # Authentication
├── services/            # Business logic services
│   ├── AuthService.ts   # Authentication
│   ├── FundService.ts   # Fund management
│   ├── WalletService.ts # Wallet operations
│   └── UserService.ts   # User management
├── types/               # TypeScript type definitions
├── di/                  # Dependency injection setup
└── App.tsx             # Main application component
```

## Dashboard Features

### Portfolio Summary
- **Total Portfolio Value**: Current worth of all investments
- **Today's Change**: Daily P&L with percentage change
- **Risk Profile**: User's risk assessment level
- **Portfolio Type**: Account classification
- **Last Sync**: Real-time data update status

### Asset Allocation
- Interactive pie chart showing fund distribution
- Color-coded fund breakdown
- Percentage allocation for each fund
- Legend with fund names and percentages

### Performance Chart
- Line chart showing portfolio performance over time
- Time period selectors (1D, 1W, 1M, 3M, 1Y, ALL)
- Detailed portfolio metrics overlay
- Interactive chart with hover states

### Transaction History
- Latest transaction entries
- Transaction types and amounts
- Navigation controls for pagination
- "See full" option for complete history

### Wallet Balance
- Multi-currency balance display
- Available vs. invested amounts
- Pending withdrawal tracking
- Wallet details access

### Quick Actions
- Add Funds button
- Withdraw functionality
- Fund-specific withdrawal
- Investment shortcuts

### News & Updates
- Latest market news cards
- Image thumbnails for articles
- Navigation between news items
- "View all" option for complete news feed

## Key Features Implementation

### User Registration & KYC
- Multi-step registration process
- Account type selection (Individual/Group/Institutional)
- Email verification requirement
- SMS-based 2FA setup
- Optional KYC submission with document upload
- Status tracking and notifications

### Fund Management
- Risk-based fund categorization (Low/Balanced/High)
- Performance tracking and historical data
- Asset allocation visualization
- Minimum investment requirements
- Fee structure (entry/withdrawal fees)

### Wallet Operations
- Multi-token support (USDT, ETH, BTC)
- Network-specific balances
- Address management and verification
- Withdrawal request processing
- Transaction status tracking

### Compliance & Security
- KYC/KYB verification workflow
- Role-based access control
- Transaction monitoring
- Audit trail maintenance
- Regulatory compliance features

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Functional components with hooks
- Dependency injection pattern
- Service-oriented architecture

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
