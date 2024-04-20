import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeORMSqliteTestingModule } from '../../services/test/TypeORMSqliteTestingModule';

describe('AuthController', () => {
  let controller: AuthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeORMSqliteTestingModule(), JwtModule],
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
