import { Redis } from "ioredis";
import { REDIS_PUBSUB_HOST, REDIS_PUBSUB_PORT, REDIS_QUEUE_PORT, REDIS_QUEUE_HOST } from "./constants";

export const bullMQRedis = new Redis({
  host: REDIS_QUEUE_HOST,
  port: REDIS_QUEUE_PORT,
  maxRetriesPerRequest: null
});

export const publisherRedis = new Redis({
  host: REDIS_PUBSUB_HOST,
  port: REDIS_PUBSUB_PORT,
});

export const subscriberRedis = new Redis({
  host: REDIS_PUBSUB_HOST,
  port: REDIS_PUBSUB_PORT,
});
