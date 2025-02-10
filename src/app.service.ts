import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  logTest() {

    this.logger.error('Hello World log message error');
    this.logger.verbose('Hello World log message verbose');
    this.logger.warn('Hello World log message warn');

  }
  
  getHello(): string {
    this.logTest(); 
    return 'Hello World!';
  }
}
