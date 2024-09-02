import type { Db } from 'mongodb';
import { MessageDB } from './dtos';

export class Repository {
  constructor(private readonly db: Db) {}

  async saveMessage(message: MessageDB) {
    message = MessageDB.parse(message);
    await this.db.collection('messages').insertOne(message);
  }
} 
