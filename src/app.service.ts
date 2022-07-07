import { Injectable } from '@nestjs/common';
import { AprsIsService } from './aprs-is/aprs-is.service';
import { DeviceLocation } from './types/ttn.message';

@Injectable()
export class AppService {
  constructor(private readonly aprsIsService: AprsIsService) {}

  handleLocationUpdate(location: DeviceLocation) {
    console.log('Received location update: ', location);
    this.aprsIsService.sendLocationUpdate(location);
  }
}
