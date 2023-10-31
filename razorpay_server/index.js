import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Razorpay from 'razorpay';
 
// import './connection.js'

import paymentRouter from './routes/paymentRouter.js'


 
dotenv.config();
// import path from 'path' 
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename); 

const PORT = process.env.PORT || 8000;     
const app = express();  

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
})

// app.use("/public", express.static(__dirname + '/public'));

app.use('/api', paymentRouter) 
app.get("/", (req, res) => {
    res.send('Server is running')
})



app.listen(PORT, (req, res)=>{
    console.log("server is started on port " + PORT); 
});