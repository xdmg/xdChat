import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//Connection to mongo;
const url = 'mongodb+srv://admin:admin@cluster0.0q1oimg.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url);

//Express setup;
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
    appId: "1502519",
    key: "d42b7154fc93085a26bb",
    secret: "6f72ad4387dba91acf3b",
    cluster: "ap2",
    useTLS: true
});

const db = mongoose.connection;
db.once("open", () => {
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        if (change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                receiver: messageDetails.receiver,
                sender: messageDetails.sender,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp
            });
        } else {
            console.log('error triggering pusher');
        }
    });
});

app.use(express.json());
app.use(cors());

app.get('/', (req,res,next) => {
    res.status(200).send("hello");
});

//Add message;
app.post('/api/v1/messages/new', (req,res,next) => {
    const msg = req.body;

    Messages.create(msg, (err,data) => {
        if (err) res.status(500).send(err);
        else res.status(201).send(data);
    });
});

//Fetch messages;
app.get('/api/v1/messages/sync', (req,res,next)=>{
    Messages.find((err,data) =>{
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    });
});

//Listen;
app.listen(port, () => {console.log(port);});