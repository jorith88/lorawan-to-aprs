import { Module } from '@nestjs/common';
import { HeliumController } from './helium.controller';
import { AprsIsModule } from '../aprs-is/aprs-is.module';

@Module({
  imports: [AprsIsModule],
  controllers: [HeliumController],
  providers: [],
})
export class HeliumModule {}
