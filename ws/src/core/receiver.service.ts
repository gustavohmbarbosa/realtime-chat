import WebSocket from "ws";
import { ConnectedReceivers } from "./connected-receivers";
import { MessageFromClient, MessageFromSender } from "../dtos";
import { z } from "zod";
import { MessageQueue } from "../message-queue/message.queue";

export class ReceiverService {
  private ws!: WebSocket;
  private connectedReceivers!: ConnectedReceivers;
  private senderId: string | undefined;

  constructor(
    private readonly messageQueue: MessageQueue,
  ) {}

  boot(ws: WebSocket, connectedReceivers: ConnectedReceivers) {
    this.ws = ws;
    this.connectedReceivers = connectedReceivers;

    this.ws.on('error', console.error);
    this.ws.on('message', async (data) => {
      try {
        const message: MessageFromClient = MessageFromClient.parse(JSON.parse(data as any)); // TODO: see safeParse

        switch (message.type) {
          case 'authenticate':
            this.authenticateMessage(message);
            break;
          case 'message':
            this.sendMessage(message);
            break;
          default:
            this.ws.send(JSON.stringify({ status: 'error', message: 'Invalid message type' }));
            break;
        }

      } catch (error) {
        console.error(error);
        this.ws.send(JSON.stringify({ status: 'error', message: 'Invalid message' }));
      }
    });
    this.ws.on('close', () => {
      if (this.senderId) {
        this.connectedReceivers.removeReceiver(this.senderId, this);
      }
    });
  
    this.ws.send(JSON.stringify({ status: 'pending' }));
  }

  sendMessageToReceiver(message: MessageFromSender) {
    this.ws.send(JSON.stringify({
      status: 'new-message',
      data: message,
    }));
  }

  private authenticateMessage(message: MessageFromClient) {
    // TODO: Authenticate the user

    const data = z.object({
      token: z.string(),
      senderId: z.string(),
    }).parse(message.data);

    this.senderId = data.senderId;

    this.ws.send(JSON.stringify({ status: 'connected' }));
    this.connectedReceivers.addReceiver(this.senderId, this);
  }

  private sendMessage(message: MessageFromClient) {
    if (!this.senderId) {
      this.ws.send(JSON.stringify({ status: 'error', message: 'Not authenticated' }));
      return;
    }

    const messageFromSender: MessageFromSender = MessageFromSender.parse(message.data);  
    if (messageFromSender.senderId !== this.senderId) {
      this.ws.send(JSON.stringify({ status: 'error', message: 'Invalid sender' }));
      return;
    }

    this.messageQueue.sendOne({
      senderId: this.senderId,
      receiverId: messageFromSender.receiverId,
      content: messageFromSender.content,
      read: false,
      timestamp: new Date().getTime(),
    });
  }
}
