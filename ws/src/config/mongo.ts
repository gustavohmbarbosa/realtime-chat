import { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_DATABASE, MONGO_URI } from './constants';

const uri = MONGO_URI;
const dbName = MONGO_DATABASE;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  minPoolSize: 2,
  maxPoolSize: 10,
}); // TODO: study more about other options to improve performance and security

export async function getMongoDatabase() {
  await client.connect();
  const db = client.db(dbName);

  await db.command({ ping: 1 });

  return db;
}
