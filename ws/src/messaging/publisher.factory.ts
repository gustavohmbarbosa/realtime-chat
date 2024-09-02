import { publisherRedis } from "../config/redis";
import { Publisher } from "./publisher";

export function makePublisherFactory() {
  return new Publisher(
    publisherRedis
  );
}
