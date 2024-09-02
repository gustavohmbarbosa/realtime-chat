import { z } from "zod";

export const MessageFromClient = z.object({
  type: z.string(),
  data: z.any(),
});

export type MessageFromClient = z.infer<typeof MessageFromClient>;

export const MessageFromSender = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string(),
});

export type MessageFromSender = z.infer<typeof MessageFromSender>;

export const MessageDB = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string(),
  timestamp: z.number(),
  read: z.boolean(),
});

export type MessageDB = z.infer<typeof MessageDB>;
