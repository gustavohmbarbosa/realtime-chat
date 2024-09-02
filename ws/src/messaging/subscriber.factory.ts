import { subscriberRedis } from "../config/redis";
import { Subscriber } from "./subscriber";

export function makeSubscriberFactory() {
  return new Subscriber(subscriberRedis);
}
