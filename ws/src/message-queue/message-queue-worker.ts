import type { Redis } from "ioredis";
import type { Publisher } from '../messaging/publisher';
import { Worker, type Job } from 'bullmq';
import type { MessageDB, MessageFromSender } from "../dtos";
import type { Repository } from "../repository";

export class MessageQueueWorker {
  private worker: Worker;

  constructor(
    private readonly bullMQRedis: Redis,
    private publisher: Publisher,
    private readonly repository: Repository,
  ) {
    this.worker = new Worker(
      "messages",
      async (job: Job<MessageDB>) => {
        switch (job.name) {
          case "send":
            await this.repository.saveMessage(job.data);
            await this.publisher.publish(
              "new-message-" + job.data.receiverId, 
              job.data
            );
            break;
        }
      },
      {
        connection: this.bullMQRedis,
        autorun: false
      },
    );
  }

  public boot() {
    this.worker.run();
  }
}
