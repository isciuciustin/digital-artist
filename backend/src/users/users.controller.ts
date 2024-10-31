import {
    Controller,
    Get,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
    Post
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async showAllUsers() {
        const users = await this.usersService.showAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Users fetched successfully',
            users
        };
    }

    @Post()
    async createUsers(@Body() data: UsersDTO) {
        const user = await this.usersService.create(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'User created successfully',
            user
        };
    }

    // @Post('/login')
    // async readUser(@Body() body: UsersDTO) {
    //     const data = await this.usersService.read(body.username, body.password);
    //     if (data != null) {
    //         return {
    //             statusCode: HttpStatus.OK,
    //             message: 'LOGIN SUCCESSFUL'
    //         };
    //     } else
    //         return {
    //             statusCode: HttpStatus.OK,
    //             message: 'LOGIN FAILED'
    //         };
    // }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        await this.usersService.destroy(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully'
        };
    }
}
