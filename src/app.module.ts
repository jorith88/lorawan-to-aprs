import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AprsIsModule } from './aprs-is/aprs-is.module';

@Module({
  imports: [AprsIsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
