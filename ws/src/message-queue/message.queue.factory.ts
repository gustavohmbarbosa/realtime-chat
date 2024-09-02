import { publisherRedis } from "../config/redis";
import { MessageQueue } from "./message.queue";

export function makeMessageQueueFactory() {
  return new MessageQueue(publisherRedis);
}
