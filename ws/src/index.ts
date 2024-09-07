import "dotenv/config";
import { WebSocketServer } from "ws";
import { ConnectedReceivers } from "./core/connected-receivers";
import { ReceiverService } from "./core/receiver.service";
import { makeMessageQueueFactory } from "./message-queue/message.queue.factory";
import { makeSubscriberFactory } from "./messaging/subscriber.factory";
import { getMongoDatabase } from "./config/mongo";
import { bullMQRedis } from "./config/redis";
import { makePublisherFactory } from "./messaging/publisher.factory";
import { Repository } from "./repository";
import { MessageQueueWorker } from "./message-queue/message-queue-worker";

// TODO: install and config eslint and lint-staged
// TODO: install and use Pino instead of console...
// TODO: add a proper layer of erro handling
// TODO: use with some round robin like strategy: import cluster from "cluster";
// TODO: split the application: one is the web socket server and the other is the worker that publishes the messages
// TODO: see if still happens: bug of sending the same message more than once on multiple connected receivers 
// TODO: add tests
// TODO: add a correct date handling (timezone, etc)
// TODO: think about TTL for client connections
// TODO: think about add a limit of connected clients per user account
// TODO: add encryption to message content
// TODO: create "last message table"

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception:", err);
});

async function bootstrap() {
  const db = await getMongoDatabase();
  const wss = new WebSocketServer({ port: 4242 });
  console.log("WebSocket server started on port 4242");

  const messageQueue = makeMessageQueueFactory();
  const connectedReceivers = new ConnectedReceivers();

  const Subscriber = makeSubscriberFactory();
  Subscriber.boot(connectedReceivers);

  wss.on("connection", function connection(ws) {
    new ReceiverService(messageQueue).boot(ws, connectedReceivers);
  });

  const repository = new Repository(db);
  const worker = new MessageQueueWorker(
    bullMQRedis,
    makePublisherFactory(),
    repository
  );
  worker.boot();
}

bootstrap();
