import {Server} from "socket.io";

const io = new Server({
    cors: {
        origin: "*", // Allow all origins (use with caution)
        methods: ["GET", "POST"]
    }
})

io.on("connection", (s) => {
    console.log("New connection:", s.id)
    s.emit("log", "Connection established");

    s.on("disconnect", ()=>{
        console.log("Disconnected:", s.id)
    })

    s.on("log", (data) => {
        console.log(data)
    })
});

export const socketIO = io;