import { Controller, Get, Param } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get(':id')
  findAll(@Param() params: any): string {
    return `Login controller ${params.id}`;
  }
}
