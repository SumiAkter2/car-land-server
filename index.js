const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hacav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const collection = client.db("carLand").collection("products");

        // item api
        app.get("/product", async (req, res) => {
            const query = {};
            const cursor = collection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });

        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await collection.findOne(query);
            res.send(item);
        });

        app.get("/myItems", async (req, res) => {

            const email = req.query;
            console.log(email);
            console.log('hi');

            const query = {};
            const cursor = collection.find(query);
            const myItems = await cursor.toArray();
            res.send(myItems);

        });

        //post api
        app.post("/product", async (req, res) => {
            const newItem = req.body;
            const result = await collection.insertOne(newItem);
            res.send(result);
        });

        //Delete Api
        app.delete("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await collection.deleteOne(query);
            res.send(result);
        });

        //Delete MyItem api
        app.delete("/myItems/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await collection.deleteOne(query);
            res.send(result);
        });

        // Update quantity api
        app.put("/quantity/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: data.quantity,
                },
            };
            const result = await collection.updateOne(
                filter,
                updateDoc,
                options
            );
            res.send(result);
        });
    }
    finally {

    }
}

run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Running this  code very easily')
})

app.listen(port, () => {
    console.log(port);
})