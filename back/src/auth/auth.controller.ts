import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response as ExpressResponse } from 'express';
import { Public } from './public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Response() response: ExpressResponse,
  ) {
    const token = await this.authService.signIn(signInDto.email, signInDto.password);

    if (token) {
      response.cookie('token', token, {
        httpOnly: true,
        maxAge: 2 * 60 * 1000, // 2 minutos
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: false,//process.env.NODE_ENV === 'production',
      });
      return response.send({ success: true });
    } else {
      return response.status(HttpStatus.UNAUTHORIZED).send({
        success: false,
        message: 'Invalid credentials',
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
   
    return req.user; // Retorna os dados do usuário autenticado
  
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Response() response: ExpressResponse) {
    response.clearCookie('token'); // Limpa o cookie do token
    return response.send({ success: true, message: 'Logout bem-sucedido' });
  }
}