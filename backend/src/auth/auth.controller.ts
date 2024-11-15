import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('verify_token')
    getProfile() {
        return {
            isValid: 'TOKEN_IS_VALID'
        };
    }

    @UseGuards(AuthGuard)
    @Post('get_tokens')
    refreshTokens(@Body() refreshTokensDto: Record<string, any>) {
        return this.authService.refreshTokens(
            refreshTokensDto.user_id,
            refreshTokensDto.username
        );
    }
}
