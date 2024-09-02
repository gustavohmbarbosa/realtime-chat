import type { MessageDB } from '../dtos';
import type { Redis } from "ioredis";
import { Queue } from "bullmq";

export class MessageQueue {
  private queue: Queue<MessageDB>;

  constructor(bullMQRedis: Redis) {
    this.queue = new Queue('messages', {
      connection: bullMQRedis
    });
  }

  async sendOne(message: MessageDB) {
    await this.queue.add('send', message);
  }
}
