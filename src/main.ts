import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { TTNModule } from './ttn/ttn.module';
import * as config from '../conf/config.json';
import { HeliumModule } from './helium/helium.module';

async function bootstrap() {
  if (config.ttn.active) {
    const ttn = await NestFactory.createMicroservice(TTNModule, {
      transport: Transport.MQTT,
      options: {
        url: config.ttn.mqtt.url,
        username: config.ttn.mqtt.username,
        password: config.ttn.mqtt.password,
      },
    });
    await ttn.listen();
  }

  if (config.helium.active) {
    const helium = await NestFactory.createMicroservice(HeliumModule, {
      transport: Transport.MQTT,
      options: {
        url: config.helium.mqtt.url,
        username: config.helium.mqtt.username,
        password: config.helium.mqtt.password,
      },
    });
    await helium.listen();
  }
}
bootstrap();
