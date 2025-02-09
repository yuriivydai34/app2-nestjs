import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
      @Public()
      @Post()
      async create(@Body() createUserDto: CreateUserDto) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
        createUserDto.password = hash;
        return this.usersService.create(createUserDto);
      }
    
      @Get()
      findAll() {
        return this.usersService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.usersService.findOneEntity(+id);
      }
    
      @Patch(':id')
      update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
      }
}
