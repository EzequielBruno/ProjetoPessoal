
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
         
            where: { email },
            
        } );
    }

    // Método para autenticar o usuário
    async authenticate(email: string, password: string): Promise<User | null> {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Verifica se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new NotFoundException('Invalid password');
        }

        return user; // Retorna o usuário se a autenticação for bem-sucedida
    }
}
