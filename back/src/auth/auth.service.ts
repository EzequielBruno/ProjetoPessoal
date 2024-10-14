import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<string> { // Alterado para retornar apenas a string do token
    const user = await this.usersService.findByEmail(email);
    
    // Verifica se o usuário existe e a senha está correta
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Cria o payload do token
    const payload = { email: user.email };
    
    // Gera o token de acesso
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: '60s',
    });

    return accessToken; // Retorna apenas o token
  }
}