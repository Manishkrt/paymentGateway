import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
dotenv.config();  

const db_url = "mongodb+srv://manish:manish@cluster0.l2er0tj.mongodb.net/perfume?retryWrites=true&w=majority";
const DBURL = process.env.DBURL || db_url

 const dbConnect = mongoose.connect(`${DBURL}`).then(()=>{
    console.log("database connected ");
}).catch(err => console.log(err))

export default dbConnect;