
import express from 'express'; 
import { Checkout, paymentverification } from "../controllers/paymentController.js";


const router = express.Router();

router.post('/checkout', Checkout)     
router.post('/paymentverification', paymentverification)     


export default router