const mongoose = require('mongoose');

const dbKey = 'mongodb://127.0.0.1:27017/todo';

mongoose.connect(dbKey)
    .then(() => {
        console.log('connection open');
    })
    .catch(err => console.log(err))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

module.exports = db;

