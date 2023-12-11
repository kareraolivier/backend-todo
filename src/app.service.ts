import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTodo(): string {
    return 'Todo App backend';
  }
}
