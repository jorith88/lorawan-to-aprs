import { Injectable } from '@nestjs/common';
import { DeviceLocation } from 'src/types/ttn.message';
import * as config from '../../conf/config.json';
import { CoordinateConverter } from 'geographic-coordinate-converter';

@Injectable()
export class AprsIsService {
  async sendLocationUpdate(location: DeviceLocation) {
    console.log('Send location update to APRS-IS');
    const aprsMessage = this.createAprsMessage(location);

    console.log(aprsMessage);
  }

  private createAprsMessage(location: DeviceLocation) {
    const aprsIsServerId = 'T2DENMARK';
    const message = 'TTN APRS Tracker Test';
    this.createCoordinates(location);

    return `${config.aprs_is.callsign}>APTN3,TCPIP*,qAC,${aprsIsServerId}:!5127.68N/00527.88E${config.aprs_is.symbol}${message}`;
  }

  private createCoordinates(location: DeviceLocation) {
    // const aprsLongitude = `${longitude.[0]}${longitude.[1]}.`
  }
}
