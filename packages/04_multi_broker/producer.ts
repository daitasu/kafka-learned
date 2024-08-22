import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "daitasu-producer",
  brokers: ['localhost:29092', 'localhost:29093', 'localhost:29094'],
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  console.log("Producer connected");

  // メッセージを送信
  await producer.send({
    topic: 'orders',
    messages: [{ value: "鶏と野菜の黒酢あん" }, { value: "沖目鯛の醤油こうじ漬け炭火焼き" }, { value: "ピリ辛本格マーボードーフ" }],
  });

  console.log("Messages sent");
  await producer.disconnect();
};

runProducer().catch(console.error);
