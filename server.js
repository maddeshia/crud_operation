const config = require("./config/config.json");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")


// configration
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


// db connection
mongoose
.connect(config.MONGO_URL)
.then(()=> console.log("Connection Successful...."))
.catch((err)=>console.log(err("connection error")));


// api routes
app.use("/api/v1/userRoutes", require("./routes/user.routes"))


const port = config.PORT || 8000;

app.listen(port,(req,res)=>{
    console.log(`server is runninng on the: ${port}`);
})
