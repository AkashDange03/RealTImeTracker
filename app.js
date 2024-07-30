import express from "express"
import http from "node:http";
import { Server } from "socket.io";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine","ejs");
app.use(express.static(join(__dirname,"public")));

io.on("connection",(socket)=>{
    console.log("connected")
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id:socket.id,...data});
    })

    socket.on("disconnect",()=>{
        console.log("disconnected")
        io.emit("user-disconnected",socket.id);
    });
})


app.get("/",(req,res)=>{
    res.render("index");
});

server.listen(3000,()=>{
    console.log("app is running on port 3000");
})