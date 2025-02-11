import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) { }

  create(createAuthorDto: CreateAuthorDto) {
    console.log('createAuthorDto: ', createAuthorDto);
    return this.authorsRepository.save(createAuthorDto);
  }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  findOne(id: number): Promise<Author | null> {
    return this.authorsRepository.findOneBy({ id });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<UpdateResult> {
    return this.authorsRepository.update(id, updateAuthorDto);
  }

  async remove(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
