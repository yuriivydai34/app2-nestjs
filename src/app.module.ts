import { MiddlewareConsumer, Module } from '@nestjs/common';
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

import KeyvRedis from '@keyv/redis';
import { Keyv } from 'keyv';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/entities/author.entity';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';

@Module({
  imports: [
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useFactory: async () => {
    //     return {
    //       store: new Keyv(new KeyvRedis('redis://localhost:6379')),
    //       ttl: 60000
    //     };
    //   },
    // }),
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
      entities: [Book, Author, User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    AppService
  ],
})
export class AppModule {
  // let's add a middleware on all routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
