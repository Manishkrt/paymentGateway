import {instance} from '../index.js'
import crypto from 'crypto'
import dotenv from "dotenv";
dotenv.config();

export const Checkout = async(req, res)=>{ 
    try { 
        const {price} = req.body 
        const options = {
            amount: Number(price * 100),  // amount in the smallest currency unit
            currency: "INR", 
        }; 
        const order = await instance.orders.create(options);  
        // res.status(200).json({"message": "success"}) 
        res.status(200).json(order) 
    } catch (error) {
        res.status(500).json(error) 
    }
} 

export const paymentverification = async(req, res)=>{ 
    try {   
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body 
        const body = razorpay_order_id + "|" + razorpay_payment_id 
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex') 
        if (expectedSignature == razorpay_signature) {
            console.log("payment is successful"); 

            // res.status(200).json({"message" : "success"}) 
            res.redirect('http://localhost:5173')
        }
        else{
            console.log("payment is failed");
            res.status(400).json({"message" : "failed"}) 
        }
    } catch (error) { 
        console.log(error); 
        res.status(500).json(error) 
    }
}