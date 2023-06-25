import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import * as config from '../../conf/config.json';
import { TTNMessage } from '../types/ttn.message';
import { AprsIsService } from 'src/aprs-is/aprs-is.service';

@Controller()
export class TTNController {
  constructor(private readonly aprsIsService: AprsIsService) {}

  @MessagePattern(config.ttn.mqtt.topic)
  handleLocationUpdate(
    @Payload() data: TTNMessage,
    @Ctx() context: MqttContext,
  ) {
    console.log(`Received message from TTN at ${data.uplink_message.received_at}`);
    for (const rxMetadata of data.uplink_message.rx_metadata) {
      console.log(
        `    - ${rxMetadata.gateway_ids.gateway_id} with RSSI ${rxMetadata.rssi} and SNR ${rxMetadata.snr}`,
      );
    }
    this.aprsIsService.sendLocationUpdate(data.uplink_message.decoded_payload);
  }
}
