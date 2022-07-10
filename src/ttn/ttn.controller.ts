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
    this.aprsIsService.sendLocationUpdate(data.uplink_message.decoded_payload);
  }
}
