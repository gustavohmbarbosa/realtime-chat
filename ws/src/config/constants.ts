import { z } from "zod";

function errorMessage(envVar: string, expectedType: string): string {
  return `The environment variable "${envVar}" is required and must be of type "${expectedType}". Please check your environment configuration.`;
}

export const MONGO_URI = z
  .string({ required_error: errorMessage("MONGO_URI", "string") })
  .parse(process.env.MONGO_URI);

export const MONGO_DATABASE = z
  .string({ required_error: errorMessage("MONGO_DATABASE", "string") })
  .parse(process.env.MONGO_DATABASE);

export const REDIS_QUEUE_HOST = z
  .string({ required_error: errorMessage("REDIS_QUEUE_HOST", "string") })
  .parse(process.env.REDIS_QUEUE_HOST);

export const REDIS_QUEUE_PORT = z
  .preprocess(
    (arg) => parseInt(arg as any),
    z.number({ required_error: errorMessage("REDIS_QUEUE_PORT", "number") })
  )
  .parse(process.env.REDIS_QUEUE_PORT);

export const REDIS_PUBSUB_HOST = z
  .string({ required_error: errorMessage("REDIS_PUBSUB_HOST", "string") })
  .parse(process.env.REDIS_PUBSUB_HOST);

export const REDIS_PUBSUB_PORT = z
  .preprocess(
    (arg) => parseInt(arg as any),
    z.number({ required_error: errorMessage("REDIS_PUBSUB_PORT", "number") })
  )
  .parse(process.env.REDIS_PUBSUB_PORT);
