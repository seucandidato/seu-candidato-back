import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeORMSqliteTestingModule } from '../../services/test/TypeORMSqliteTestingModule';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import {
  ExecutionContext,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;
  let service: AuthService;
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeORMSqliteTestingModule(),
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, UserService, AuthGuard, JwtService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an access token when signIn is called with valid credentials', async () => {
    const signInDto = { username: 'clarckkent', password: '123456' };
    const accessToken = 'teste-access-token';

    jest.spyOn(service, 'signIn').mockImplementation(async () => ({
      access_token: accessToken,
    }));

    const result = await controller.signIn(signInDto);
    expect(result.access_token).toEqual(accessToken);
  });

  it('should throw UnauthorizedException if no token provided', async () => {
    const contextMock = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    };

    await expect(
      guard.canActivate(contextMock as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    const contextMock = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalid_token',
          },
        }),
      }),
    };

    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error());

    await expect(
      guard.canActivate(contextMock as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });
});
