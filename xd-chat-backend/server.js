import express from "express";
import mongoose, { mongo } from "mongoose";
// import { ObjectId } from "mongoose";
// from mongoose import { ObjectId } from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// const { ObjectId } = require('mongodb');

//Connection to mongo;
const url =
  "mongodb+srv://admin:admin@cluster0.godzsvn.mongodb.net/?retryWrites=true&w=majority"; //'mongodb+srv://admin:admin@cluster0.0q1oimg.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url);

//Express setup;
const app = express();
const port = process.env.PORT || 9000;
// const pusher = new Pusher({
//   appId: "1502519",
//   key: "d42b7154fc93085a26bb",
//   secret: "6f72ad4387dba91acf3b",
//   cluster: "ap2",
//   useTLS: true,
// });
const pusher = new Pusher({
  appId: "1484228",
  key: "5fd72bdbc25ba07c8de1",
  secret: "4fa12f0765c5673d54fb",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    // console.log("Change triggered");
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        _id: messageDetails._id,
        receiver: messageDetails.receiver,
        sender: messageDetails.sender,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
      });
    } else if (change.operationType === "delete") {
      const delId = change.documentKey;
      pusher.trigger("messages", "deleted", {
        id: delId._id,
      });
      // console.log("Change del triggered", delId);
    } else {
      console.log("error triggering pusher");
    }
  });
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).send("hello");
});

//Add message;
app.post("/api/v1/messages/new", (req, res, next) => {
  const msg = req.body;

  Messages.create(msg, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

//Fetch messages;
app.get("/api/v1/messages/sync", (req, res, next) => {
  Messages.find((err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
});

//delete message
app.delete("/api/v1/messages/delete", async (req, res, next) => {
  // console.log(`nikal yahan se ${req.body.id}`);
  res.send("Response received");
  // mongo.ObjectId()
  Messages.deleteOne({ _id: mongo.ObjectId(req.body.id) }).then((_) => {
    // console.log("nahi");
  });
});

//Listen;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
