const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./app/routes/routes');
const session = require('express-session');
const PORT = process.env.PORT || 5000;
const http = require('http');
const getHours = require('./app/utils/getHours');
const format = require('./app/utils/timeFormat');
const saveHours = require('./app/utils/saveHours');
const incrementHours = require('./app/utils/incrementHours');

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:"http://localhost:5173", methods: ["GET", "POST", "DELETE"]},
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

io.on('connection', (socket)=>{
    let userTimer;
    let projectTimer;
    let interval;
    let project_id;
    let user_id;
    let formatteduserTimer;

    socket.on('start', async (data)=>{
        user_id = data.user.id;
        project_id = data.project.id;
        userTimer = await getHours(null, user_id);
        projectTimer = await getHours(project_id, user_id);

        interval = setInterval(() => {
            projectTimer = incrementHours(projectTimer);
            userTimer = incrementHours(userTimer);
            formatteduserTimer = format(userTimer);
            socket.emit('userTimer', formatteduserTimer);       
        }, 1000);
    });

    socket.on('pause', () => {
        const formattedprojectTimer = format(projectTimer);

        saveHours(formattedprojectTimer, project_id, user_id);
        clearInterval(interval);
    });
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});