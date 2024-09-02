import { Redis } from "ioredis";
import { ConnectedReceivers } from "../core/connected-receivers";

export class Subscriber {
  private connectedReceivers!: ConnectedReceivers;

  constructor(
    private redis: Redis,
  ) {}

  public boot(connectedReceivers: ConnectedReceivers) {
    this.connectedReceivers = connectedReceivers;
    this.redis.psubscribe("new-message-*", (err, count) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        console.log(
          `Subscribed successfully! This client is currently subscribed to ${count} channels.`
        );
      }
    });

    this.redis.on("pmessage", (_, channel, message) => {
      console.log(`Received ${message} from ${channel} p: ${_}`);
    
      const receiverId = channel.split("-")[2];
      const receivers = this.connectedReceivers.getReceivers(receiverId);
      if (!receivers?.length) {
        console.log("Receiver not found");
        return;
      }
    
      for (let i = 0; i < receivers.length; i++) {
        receivers[i].sendMessageToReceiver(JSON.parse(message));
      }
    });
  }
}
