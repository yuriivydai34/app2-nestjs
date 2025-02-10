import { Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

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

import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv('redis://localhost:6379'),
          ],
        };
      },
    }),
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService
  ],
})
export class AppModule {}
