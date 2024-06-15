import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthException } from '../../services/exceptions/auth.exception';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUsername(username);

    if (user?.password !== CryptoJS.MD5(pass).toString()) {
      throw new AuthException(
        'Erro de autenticação - Username/Email ou Password incorreto(s)!',
      );
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
