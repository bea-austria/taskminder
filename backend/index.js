const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const router = require('./app/routes/routes');
const session = require('express-session');
const PORT = 5000;
const http = require('http');
const getHours = require('./app/utils/getHours');
const format = require('./app/utils/timeFormat');
const saveHours = require('./app/utils/saveHours');
const incrementHours = require('./app/utils/incrementHours');
const cron = require('node-cron');
const createProductivityEntry = require('./app/utils/createProductivityEntry');
const createActivityEntry = require('./app/utils/createActivityEntry');
const cookieParser = require('cookie-parser');

const { Server } = require("socket.io");
const server = http.createServer(app);

const corsOptions = {origin: true, methods: ["GET", "POST", "DELETE"], credentials: true};
const io = new Server(server, {cors: corsOptions});

// app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 3,
        expires: 1000 * 60 * 60 * 24 * 3
    },
}));

app.use('/screenshots', express.static('app/screenshots')); //Makes the screenshots accessible to the React components
app.use(router);

//Establishes the socket connection for time tracker
io.on('connection', (socket)=>{
    let projectTimer;
    let interval;
    let project_id;
    let formattedprojectTimer;
    let user_id;

    socket.on('start', async (data)=>{
        user_id = data.user.id;
        project_id = data.project.id;
        projectTimer = await getHours(project_id);

        interval = setInterval(() => {
            projectTimer = incrementHours(projectTimer);
            formattedprojectTimer = format(projectTimer);
            socket.emit('userTimer', formattedprojectTimer);       
        }, 1000);
    });

    socket.on('pause', () => {
        saveHours(formattedprojectTimer, project_id);
        clearInterval(interval);
    });
});

//Schedules a cron job at 12 am daily to create new activity and productivity entries in the database
cron.schedule('0 0 * * *', () => {
    createProductivityEntry();
    createActivityEntry();
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});