import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControlModule } from './control/control.module';

@Module({
  imports: [ControlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
