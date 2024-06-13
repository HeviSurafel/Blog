const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const route = require("./Routes/UserRoute");
const  connectDb = require("./Config/ConnectionDb");
const cookieParser=require('cookie-parser')
const path = require('path'); 
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
  
}))

app.use(cookieParser())
app.use(express.json()); 
app.use("/api", route);
app.use('/uploads', express.static(__dirname + '/uploads'));
app.listen(process.env.PORT, () => {
  connectDb()
  console.log(`something is coming babe ${process.env.PORT}`);
});
