const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./app/routes/routes');
const session = require('express-session');
const PORT = process.env.PORT || 5000;

app.use(session({
    secret: 'probability',
    resave: false,
    saveUninitialized: true
}));

app.use(cors());
app.use(express.json());
app.use(router);

  
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});