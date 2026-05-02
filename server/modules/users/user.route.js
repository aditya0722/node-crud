const express = require("express");
const authenticateToken = require("../../middlewares/auth.middlewares");
const {getUsers,deleteUser,updateUser}=require("./user.controller");
const {apiLimiter} =require("../../middlewares/apiLimiter.middleware")
const userRoute=express.Router();

userRoute.get("/",authenticateToken,apiLimiter,getUsers);
userRoute.delete("/:id",authenticateToken,apiLimiter,deleteUser);
userRoute.patch("/:id",authenticateToken,apiLimiter,updateUser);

module.exports =userRoute;