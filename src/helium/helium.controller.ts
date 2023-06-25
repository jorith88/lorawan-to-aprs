import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import * as config from '../../conf/config.json';
import { HeliumMessage } from '../types/helium.message';
import { AprsIsService } from 'src/aprs-is/aprs-is.service';

@Controller()
export class HeliumController {
  constructor(private readonly aprsIsService: AprsIsService) {}

  @MessagePattern(config.helium.mqtt.topic)
  handleLocationUpdate(
    @Payload() data: HeliumMessage,
    @Ctx() context: MqttContext,
  ) {
    console.log(`Received message from Helium at ${data.reported_at}`);
    for (const hotspot of data.hotspots) {
      console.log(
        `    - ${hotspot.name} with RSSI ${hotspot.rssi} and SNR ${hotspot.snr}`,
      );
    }
    this.aprsIsService.sendLocationUpdate(data.decoded.payload);
  }
}
