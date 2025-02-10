import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { User } from './users/entities/user.entity';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as WinstonGraylog2 from 'winston-graylog2';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
        new WinstonGraylog2({
          name: 'Graylog',
          level: 'info',
          silent: false,
          handleExceptions: true,
          graylog: {
            servers: [{ host: '127.0.0.1', port: 12201 }],
            hostname: 'nest-app',
            facility: 'nest-graylog',
            bufferSize: 1400,
          },
          staticMeta: {
            env: process.env.NODE_ENV || 'development',
          },
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'nest1',
      entities: [Book, User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
