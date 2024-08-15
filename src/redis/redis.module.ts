import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
const keys = require('../Config/ENV/keys');
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || keys.redisConnection.host,
          port: process.env.REDIS_PORT || keys.redisConnection.port,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
