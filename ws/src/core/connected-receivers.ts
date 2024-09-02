import { ReceiverService } from "./receiver.service";

export class ConnectedReceivers {
  private receivers: Record<string, ReceiverService[]> = {};

  addReceiver(senderId: string, receiver: ReceiverService) {
    this.receivers[senderId] ??= [];
    this.receivers[senderId].push(receiver);
  }

  getReceivers(senderId: string) {
    return this.receivers[senderId] ?? null;
  }

  removeReceiver(senderId: string, receiver: ReceiverService) {
    this.receivers[senderId] = this.receivers[senderId].filter((r) => r !== receiver);
  }
}
