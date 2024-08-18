import { Kafka } from "kafkajs";
import { Client } from "pg";

const kafka = new Kafka({
  clientId: "cdc-client",
  brokers: ["localhost:29092"],
});

const consumer = kafka.consumer({
  groupId: "cdc-group",
});

const pgClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "newDB",
  password: "password",
  port: 5433,
});

const run = async () => {
  await pgClient.connect();

  await consumer.connect();
  await consumer.subscribe({
    topic: "dbserver1.public.users",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const change = JSON.parse(message.value.toString());

      // CDC メッセージに基づいて、新DBに変更を反映させる処理
      if (change.payload && change.payload.after) {
        const { id, name, email, created_at } = change.payload.after;

        const validCreatedAt = isNaN(new Date(created_at).getTime())
          ? new Date()
          : new Date(created_at);

        const query = `
          INSERT INTO Users (id, name, email, created_at) 
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO UPDATE 
          SET name = EXCLUDED.name, email = EXCLUDED.email, created_at = EXCLUDED.created_at;
        `;
        await pgClient.query(query, [id, name, email, validCreatedAt]);
      }
    },
  });
};

run().catch(console.error);
