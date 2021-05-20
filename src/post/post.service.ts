import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {

  getTest(): string {
    return 'We are getting';
  }
}
