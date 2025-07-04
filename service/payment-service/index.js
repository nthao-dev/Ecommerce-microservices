import express from 'express';
import cors from 'cors';
import { Kafka } from "kafkajs";


const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(express.json());
const kafka = new Kafka({
    clientId: "payment-service",
    brokers: ['localhost:9094', 'localhost:9095', 'localhost:9096'],
});

const producer = kafka.producer();

const connectKafka = async () => {
    try {
        await producer.connect();
        console.log("Connected to Kafka");
    }
    catch (err) {
        console.log('Error connecting to Kafka', err);
    }
}

app.post("/payment-service", async (req, res) => {
    const { cart } = req.body;
    const userId = "123"
    //TODO: payment

    //Kafka
    await producer.send({
        topic: "payment-successful",
        messages: [
            {
                value: JSON.stringify({
                    userId,
                    cart,
                }),
            },
        ],
    });

    return res.status(200).send("Payment successful");
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
})

app.listen(8000, () => {
    connectKafka();
    console.log("payment service is running on port 8000");
});