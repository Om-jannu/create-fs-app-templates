import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; status: string } {
    return {
      message: '{{PROJECT_NAME}} API is running',
      status: 'ok',
    };
  }
}
