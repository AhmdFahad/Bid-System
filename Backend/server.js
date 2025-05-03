const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const Redis = require("ioredis");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const redis = new Redis({
    host: "2.58.81.195",
    port: 30079,
    password: "redispassword"
});

app.use(cors());
app.use(express.json());


const BID_KEY = "current_bid";

io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    // Send current bid on connect
    redis.get(BID_KEY).then((value) => {
        socket.emit("bid_update", parseInt(value) || 0);
    });

    socket.on("place_bid", async (amount) => {
        const current = parseInt(await redis.get(BID_KEY)) || 0;
        const newBid = current + parseInt(amount);
        await redis.set(BID_KEY, newBid);
        io.emit("bid_update", newBid);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("Bidding server running on port 3001");
});
