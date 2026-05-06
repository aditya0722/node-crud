const express = require('express');
const pool = require('./config/db');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const cors = require('cors');
const authenticateToken=require('./middlewares/auth.middlewares');

const authRoute =require("./modules/auth/auth.route");
const userRoute = require("./modules/users/user.route");



app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173','http://127.0.0.1:5173','http://13.55.38.20:5173']
}));

app.use("/api/users",userRoute);
app.use('/api/auth', authRoute);




module.exports=app;
