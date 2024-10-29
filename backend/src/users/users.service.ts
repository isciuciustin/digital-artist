import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>
    ) {}

    async showAll() {
        return await this.usersRepository.find();
    }

    async create(data: UsersDTO) {
        const user = await this.usersRepository.save(
            this.usersRepository.create(data)
        );
        return user;
    }

    // async findByEmail(email: string): Promise<UsersDTO> {
    //     return await this.usersRepository.findOne({
    //         where: {
    //             email: email
    //         }
    //     });
    // }

    async read(username: string, password: string) {
        return await this.usersRepository.findOne({
            where: { username: username, password: password }
        });
    }

    // async update(id: number, data: Partial<UsersDTO>) {
    //     await this.usersRepository.update({ id }, data);
    //     return await this.usersRepository.findOne({ id });
    // }

    async destroy(id: number) {
        await this.usersRepository.delete({ id });
        return { deleted: true };
    }
}
