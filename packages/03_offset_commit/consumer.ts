import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "daitasu-consumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const runConsumer = async () => {
  await consumer.connect();
  console.log("Consumer connected");

  // トピックの購読を開始
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // メッセージの処理
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        // メッセージ処理が成功した場合にのみ offset をcommit
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() },
        ]);
        console.log(`Offset committed: ${message.offset}`);
      } catch (error) {
        // エラーが発生した場合、offset は commit しない
        console.error(`Error processing message: ${error}`);
      }
    },
  });
};

runConsumer().catch(console.error);
