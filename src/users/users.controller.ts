import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
      @Public()
      @Post()
      async create(@Body() createUserDto: CreateUserDto) {
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
