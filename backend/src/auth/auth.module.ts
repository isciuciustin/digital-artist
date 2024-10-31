import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([UsersEntity])],
    controllers: [AuthController],
    providers: [AuthService, UsersService]
})
export class AuthModule {}
