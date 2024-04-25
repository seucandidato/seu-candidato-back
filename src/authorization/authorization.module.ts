import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { MailerService } from '../mailer/mailer.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, MailerService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthorizationModule {}
