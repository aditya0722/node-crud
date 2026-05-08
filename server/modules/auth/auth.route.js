const express = require("express");
const {userLogin,userRegister,userRefresh,userLogout}=require("./auth.controller")
const authRoute=express.Router();
const {loginLimiter}=require("../../middlewares/rateLimiter.middleware")


authRoute.post("/login",loginLimiter,userLogin);
authRoute.post("/register",userRegister);
authRoute.post("/refresh",userRefresh);
authRoute.post("/logout",userLogout);

module.exports = authRoute;