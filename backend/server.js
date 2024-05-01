const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./app/routes/routes');
const session = require('express-session');
const PORT = process.env.PORT || 5000;
const http = require('http');
const getHours = require('./app/utils/getHours');
const format = require('./app/utils/timeFormat');


const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:"http://localhost:5173", methods: ["GET", "POST"]},
});

app.use(session({
    secret: 'probability',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        expires: 1000 * 60 * 60 * 24 * 3
    },
}));

app.use(cors());
app.use(express.json());
app.use(router)

let timer;
let interval;
io.on('connection', (socket)=>{
    socket.on('start', async (project)=>{
        const savedHours = await getHours(project);
        timer = savedHours;

        interval = setInterval(() => {
            timer.seconds++;
            if (timer.seconds === 60) {
              timer.seconds = 0;
              timer.minutes++;
              if (timer.minutes === 60) {
                timer.minutes = 0;
                timer.hours++;
              }
            }
            
            const formattedTimer = format(timer);
            socket.emit('timer', formattedTimer);
            
          }, 1000);
    });

    socket.on('pause', () => {
        clearInterval(interval);
    });

    
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});