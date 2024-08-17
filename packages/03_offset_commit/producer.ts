import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "daitasu-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  console.log("Producer connected");

  // メッセージを送信
  await producer.send({
    topic: "test-topic",
    messages: [
      { value: "正常なメッセージ1" },
      { value: "エラーになるメッセージ" },
      { value: "正常なメッセージ2" },
    ],
  });

  console.log("Messages sent");
  await producer.disconnect();
};

runProducer().catch(console.error);
