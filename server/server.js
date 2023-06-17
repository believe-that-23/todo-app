const express = require('express');
const dbConfig = require('./config/dbConfig');
const cors = require('cors');
const app = express();

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on ${port}`);
})