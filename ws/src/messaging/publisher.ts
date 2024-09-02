import { Redis } from "ioredis";
import { MessageFromSender } from "../dtos";

export class Publisher {
  constructor (private readonly redis: Redis) {}

  public async publish(channel: string, message: MessageFromSender) {
    await this.redis.publish(channel, JSON.stringify(message));
  }
}
