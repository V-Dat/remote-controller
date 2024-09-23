import { Controller, Post, Body } from '@nestjs/common';
// import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ControlService } from './control.service';
import { SystemAction } from 'src/constants/enum/system.action';
// import { AuthGuard } from '@nestjs/passport'; // Giả sử bạn đã cài đặt xác thực

@Controller('control')
// @UseGuards(AuthGuard('jwt')) // Thêm bảo vệ xác thực
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post()
  async controlAction(@Body() body: { action: SystemAction }) {
    return this.controlService.executeAction(body.action);
  }
}
