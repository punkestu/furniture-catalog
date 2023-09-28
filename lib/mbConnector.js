const {Kafka, logLevel} = require("kafkajs");
// const {Partitioners} = require("kafkajs");

module.exports = class {
    static #conn;

    static GetInstance(clientId, brokers) {
        if (typeof this.#conn === 'undefined') {
            this.#conn = new Kafka({
                clientId,
                brokers,
                logLevel: logLevel.WARN,
            });
        }
        return this;
    }

    // static async CreateTopic(topic, partition = 3) {
    //     try {
    //         const admin = this.#conn.admin();
    //         await admin.connect();
    //         await admin.createTopics({
    //             topics: [
    //                 {
    //                     topic,
    //                     numPartitions: partition,
    //                     replicationFactor: 1,
    //                 },
    //             ],
    //         });
    //         await admin.disconnect();
    //         return true;
    //     } catch (err) {
    //         return false;
    //     }
    // }
    //
    // static async Push(topic, key, messages) {
    //     try {
    //         const producer = this.#conn.producer({
    //             allowAutoTopicCreation: false,
    //             createPartitioner: Partitioners.LegacyPartitioner,
    //         });
    //         await producer.connect();
    //         await producer.send({
    //             topic,
    //             messages: {
    //                 key,
    //                 value: messages
    //             },
    //         });
    //         await producer.disconnect();
    //         return true;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    static async Fetch(groupId, topic, callBack) {
        try {
            const consumer = this.#conn.consumer({groupId});

            await consumer.connect();
            await consumer.subscribe({topic, fromBeginning: true});

            await consumer.run({
                eachMessage: callBack
            });
        } catch (err) {
            throw err;
        }
    }
}