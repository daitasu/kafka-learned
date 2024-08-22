import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "daitasu-consumer",
  brokers: ['localhost:29092', 'localhost:29093', 'localhost:29094'],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const runConsumer = async () => {
  await consumer.connect();
  console.log("Consumer connected");

  // トピックの購読を開始
  await consumer.subscribe({ topic: "orders", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Topic:', topic);
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

runConsumer().catch(console.error);
