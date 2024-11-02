import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.read(username, pass);
        if (user != null) {
            const payload = { sub: user.id, username: user.username };
            return {
                access_token: await this.jwtService.signAsync(payload),
                refresh_token: await this.jwtService.signAsync(payload, {
                    expiresIn: '30d'
                }),
                user_id: user.id,
                username: user.username
            };
        } else
            return {
                statusCode: HttpStatus.OK,
                message: 'LOGIN FAILED'
            };
    }
    async refreshTokens(user_id: string, username: string): Promise<any> {
        const payload = { sub: user_id, username: username };

        return {
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: await this.jwtService.signAsync(payload, {
                expiresIn: '30d'
            }),
            user_id: user_id,
            username: username
        };
    }
}
