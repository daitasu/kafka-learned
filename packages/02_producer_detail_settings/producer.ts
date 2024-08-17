import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "daitasu-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer({
  allowAutoTopicCreation: true,
  transactionTimeout: 30000,
  maxInFlightRequests: 1,
  idempotent: true,
});

const runProducer = async () => {
  await producer.connect();
  console.log("Producer connected");

  // メッセージを送信
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "こんにちは！" }, { value: "さようなら！" }],
    acks: -1,
  });

  console.log("Messages sent");
  await producer.disconnect();
};

runProducer().catch(console.error);
