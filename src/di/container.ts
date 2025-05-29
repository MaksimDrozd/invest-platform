import { Container } from 'inversify';
import { TYPES } from './types';
import { AuthService } from '../services/AuthService';
import { FundService } from '../services/FundService';
import { WalletService } from '../services/WalletService';
import { UserService } from '../services/UserService';

const container = new Container();

container.bind(TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind(TYPES.FundService).to(FundService).inSingletonScope();
container.bind(TYPES.WalletService).to(WalletService).inSingletonScope();
container.bind(TYPES.UserService).to(UserService).inSingletonScope();

export { container }; 