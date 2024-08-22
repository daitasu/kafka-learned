import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "daitasu-producer",
  brokers: ['localhost:29092', 'localhost:29093', 'localhost:29094'],
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  console.log("Producer connected");

  await producer.send({
    topic: 'orders',
    messages: [
      { value: '鶏と野菜の黒酢あん', partition: 1 },
      { value: '沖目鯛の醤油こうじ漬け炭火焼き', partition: 0 },
      { value: 'ピリ辛本格マーボードーフ', partition: 2 },
    ],
    acks: -1
  });

  console.log("Messages sent to different partitions!");
  await producer.disconnect();
};

runProducer().catch(console.error);
