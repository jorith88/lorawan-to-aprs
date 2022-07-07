import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as config from '../conf/config.json';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: config.mqtt.url,
      username: config.mqtt.username,
      password: config.mqtt.password,
    },
  });
  await app.listen();
}
bootstrap();
