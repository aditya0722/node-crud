const app=require("./index.js")

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;


app.listen(PORT,"0.0.0.0",()=>{
    console.log(" server is running");
    
})
app.get("/", (req, res) => {
  res.send("Server is running");
});
