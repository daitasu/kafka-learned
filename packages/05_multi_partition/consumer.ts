import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "daitasu-consumer",
  brokers: ['localhost:29092', 'localhost:29093', 'localhost:29094'],
});

const consumer = kafka.consumer({
  groupId: "test-group",
});

const runConsumer = async () => {
  await consumer.connect();
  console.log("Consumer connected");

  // トピックの購読を開始
  await consumer.subscribe({ topic: "orders", fromBeginning: true });

  // Consumer の手動 partition 割り当ては現状負荷
  // refs: https://github.com/tulios/kafkajs/issues/373#issuecomment-1155343133
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Topic:', topic);
      console.log('partition:', partition);

      if (partition === 0) {
        console.log('Partition 0 の処理 ============');
      } else if (partition === 1) {
        console.log('Partition 1 の処理 ============');
      } else if (partition === 2) {
        console.log('Partition 2 の処理 ============');
      }

      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

runConsumer().catch(console.error);
