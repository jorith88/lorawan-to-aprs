import { Module } from '@nestjs/common';
import { TTNController } from './ttn.controller';
import { AprsIsModule } from '../aprs-is/aprs-is.module';

@Module({
  imports: [AprsIsModule],
  controllers: [TTNController],
  providers: [],
})
export class TTNModule {}
