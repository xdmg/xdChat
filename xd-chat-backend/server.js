import express from "express";
import mongoose, {mongo} from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//Connection url for mongo;
const url =
    "mongodb+srv://admin:admin@cluster0.godzsvn.mongodb.net/?retryWrites=true&w=majority"; //'mongodb+srv://admin:admin@cluster0.0q1oimg.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url).catch((e) => console.log(e.message));

//Express setup;
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1484228",
    key: "5fd72bdbc25ba07c8de1",
    secret: "4fa12f0765c5673d54fb",
    cluster: "ap2",
    useTLS: true,
});

//Connect to mongo;
const database = mongoose.connection;
database.once("open", () => {
    console.log("DB connected");
    const msgCollection = database.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {

        switch (change.operationType) {
            case "insert":
                const messageDetails = change.fullDocument;
                pusher.trigger("messages", "inserted", {
                    _id: messageDetails._id,
                    receiver: messageDetails.receiver,
                    sender: messageDetails.sender,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                }).catch(e => console.log(e.message));
                break;

            case "delete":
                const delId = change.documentKey;
                pusher.trigger("messages", "deleted", {
                    id: delId._id,
                }).catch(e => console.log(e.message));
                break;

            default:
                console.log("Invalid Pusher operation type.");
        }
    });
});

//CORS and JSON middleware;
app.use(express.json());
app.use(cors());

//Tester page;
app.get("/", (req, res, next) => {
    res.status(200).send("Server is running.");
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

//Delete message;
app.delete("/api/v1/messages/delete", async (req, res, next) => {
    res.send("Response received");
    Messages.deleteOne({_id: mongo.ObjectId(req.body.id)}).then((_) => {
    });
});

//Listen;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
