const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors=require('cors');
require('dotenv').config();
const port=process.env.PORT || 5000;

const app=express();

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hacav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const collection = client.db("carLand").collection("products");

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = collection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        app.get('/products/:id', async(req, res) =>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const service = await collection.findOne(query);
            res.send(service);
        });

        // POST:::::::::
        app.post('/products', async(req, res) =>{
            const newService = req.body;
            const result = await collection.insertOne(newService);
            res.send(result);
        });

       // DELETE:::::::::::
        app.delete('/products/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await collection.deleteOne(query);
            res.send(result);
        });

    }
    finally {

    }
}

run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('Running this  code easily')
})

app.listen(port,()=>{
    console.log(port);
})