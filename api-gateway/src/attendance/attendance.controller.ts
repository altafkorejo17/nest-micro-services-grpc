import { Controller, Post } from '@nestjs/common';
import { RpcClientService } from 'src/common/services/rpc-client.service';

@Controller('attendance')
export class Attendance {
  constructor(private rpcClient: RpcClientService) {}
}
