import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import * as config from '../conf/config.json';
import { TTNMessage } from './types/ttn.message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(config.mqtt.topic)
  handleLocationUpdate(
    @Payload() data: TTNMessage,
    @Ctx() context: MqttContext,
  ) {
    this.appService.handleLocationUpdate(data.uplink_message.decoded_payload);
  }
}
