const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connexion to MongoDB via mongoose
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Import Routes
const usersRouter = require('./routes/users');
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');

//Routes Middleware
app.use('/api/user',authRoute);
app.use('/home',homeRoute);
app.use('/users', usersRouter);

// listen to the port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
