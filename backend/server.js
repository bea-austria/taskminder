const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./app/routes/routes');
const session = require('express-session');
const PORT = process.env.PORT || 5000;

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

  
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});