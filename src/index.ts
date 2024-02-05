import express ,{ Express } from "express";
import http from "http"
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/routes";

const app:Express = express();

const server=http.createServer(app)

// Express confrigation 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("PORT",3000)
app.set("BASE_URL","localhost")
dotenv.config()

//define the routes
app.use("/api/v1",router)

// Mongo Connection

const mongoURI= process.env.MONGO_DGB_URI

if(!mongoURI){
    console.error("MongoDB URL is not defined")
    process.exit(1)
}

mongoose.connect(mongoURI,{}).then(()=>{
    console.log("MongDB is connected");

})
.catch((error)=>{
    console.log(error)
});

// start the server

try{
const port:Number=app.get("PORT") 
const baseUrl:String =app.get("Base_URL")
server.listen(port,(): void =>{
    console.log("Server is listening")
})
}catch(error){
    console.log(error)
}