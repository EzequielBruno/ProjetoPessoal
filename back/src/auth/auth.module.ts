import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }, // Configure o tempo de expiração conforme necessário
    }),
  ],
  providers: [
    AuthService // Adicione AuthService aqui
    
  ],
  controllers: [AuthController],
  exports: [AuthService], // Exporte AuthService se for usado em outros módulos
})
export class AuthModule {}