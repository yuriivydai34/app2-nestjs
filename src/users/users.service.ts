import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
    ) {}
  
    async findOne(username: string) {
      return await this.usersRepository.findOneBy({username});
    }

    async create(createUserDto: CreateUserDto) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      createUserDto.password = hash;
      return this.usersRepository.save(createUserDto);
    }
  
    findAll(): Promise<User[]> {
      return this.usersRepository.find();
    }
  
    findOneEntity(id: number): Promise<User | null> {
      return this.usersRepository.findOneBy({userId: id})
    }
  
    async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
      return this.usersRepository.update(id, updateUserDto);
    }
  
    async remove(id: number): Promise<void> {
      await this.usersRepository.delete(id);
    }
}
