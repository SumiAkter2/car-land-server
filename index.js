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
client.connect(err => {
  
  console.log('mongodb connected');
  

  client.close();
});


async function run() {
    try {
        await client.connect();
        const collection = client.db("theCarLand").collection("products");

        app.get('/shop', async (req, res) => {
            const query = {};
            const cursor = collection.find(query);
            const shops = await cursor.toArray();
            res.send(shops);
        });

        // app.get('/service/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     const query={_id: ObjectId(id)};
        //     const service = await serviceCollection.findOne(query);
        //     res.send(service);
        // });

        // POST
        // app.post('/service', async(req, res) =>{
        //     const newService = req.body;
        //     const result = await serviceCollection.insertOne(newService);
        //     res.send(result);
        // });

        // DELETE
        // app.delete('/service/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await serviceCollection.deleteOne(query);
        //     res.send(result);
        // });

    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Genius Server');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})


app.get('/',(req,res)=>{
    res.send('Running this  code easily')
})

app.listen(port,()=>{
    console.log(port);
})