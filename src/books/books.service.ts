import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Like, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) { }

  create(createBookDto: CreateBookDto) {
    console.log('createBookDto: ', createBookDto);
    return this.booksRepository.save(createBookDto);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find(
      {
        order: {
          name: "ASC" // "DESC"
        }
      }
    );
  }

  findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOneBy({ id })
  }

  findByName(name: string): Promise<Book[]> {
    return this.booksRepository.findBy({ name: Like(`%${name}%`) })
  }

  update(id: number, updateBookDto: UpdateBookDto): Promise<UpdateResult> {
    return this.booksRepository.update(id, updateBookDto);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
