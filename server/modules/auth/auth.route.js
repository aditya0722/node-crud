const express = require("express");
const {userLogin,userRegister}=require("./auth.controller")
const authRoute=express.Router();
const {loginLimiter}=require("../../middlewares/rateLimiter.middleware")


authRoute.post("/login",loginLimiter,userLogin);
authRoute.post("/register",userRegister);


module.exports = authRoute;