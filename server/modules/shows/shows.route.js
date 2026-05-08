const showRoute=require("express").Router();
const {getAllShows,getShowDetails,getShowTimes,createShow,updateShow,deleteShow}=require("./shows.controller");
const authenticateToken = require("../../middlewares/auth.middlewares");
const {apiLimiter} =require("../../middlewares/apiLimiter.middleware");

//user routes
showRoute.get("/",apiLimiter,getAllShows);
showRoute.get("/:id",apiLimiter,getShowDetails);
showRoute.post("/:id/showtimes",apiLimiter,getShowTimes);

//Admin routes

showRoute.post("/",apiLimiter,createShow);
showRoute.put("/:id",apiLimiter,updateShow);
showRoute.delete("/:id",apiLimiter,deleteShow);

module.exports=showRoute;