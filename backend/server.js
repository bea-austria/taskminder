const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/addUser', (req, res) => {
  const user = req.body
});

app.post('/api/logUser', (req, res) => {
  const user = {email: req.body.email, password: req.body.password}
});
  
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});