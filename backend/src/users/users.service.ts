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

    async read(username: string, password: string) {
        return await this.usersRepository.findOne({
            where: { username: username, password: password }
        });
    }

    async destroy(id: number) {
        await this.usersRepository.delete({ id });
        return { deleted: true };
    }
}
