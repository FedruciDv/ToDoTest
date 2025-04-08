import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './common/dto/response.dto';

@Injectable()
export class AppService {
  getHello(): Object {
    return new ResponseDTO({});
  }
}
