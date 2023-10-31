import axios from 'axios'
import React from 'react'

const Home = () => {
const productAllData = [
    {
      image : "https://m.media-amazon.com/images/I/41vLb-72RlL._SX300_SY300_QL70_FMwebp_.jpg", 
      price : "400",
      name : "product one"
    },
    {
      image : "https://m.media-amazon.com/images/I/41rNXuSlyvL._SX300_SY300_QL70_FMwebp_.jpg", 
      price : "600",
      name : "product two"
    }
  ]

  const checkoutHandle = async (e, product)=>{
    
    e.preventDefault() 

    console.log("product: " ,  product);
    try {
      const {data} =  await axios.post(`http://localhost:8000/api/checkout`, product)  
      console.log("data image", data);
      const options = {
        "key": "rzp_test_rqP83WfHSN3deP", 
        "amount": data.amount,  
        "currency": "INR",
        "name": "Teamlans ",
        "description": "Test Transaction for razorpay",
        "image": product.image,
        "order_id": data.id,  
        "callback_url": "http://localhost:8000/api/paymentverification",
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "7500600628"
        }, 
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open()

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <> 
    <section className='py-5'>
      <div className="container">
        <div className="d-flex align-iems-center justify-content-center gap-4 mb-3">
        {productAllData.map((productValue)=>{
          return(
            <div className="card p-4 shadow" key={productValue.name}>
              <div className=' text-center'>
                <img src={productValue.image} alt="" className='w-50  '/>
              </div>
              <div>
                <p className='mb-0 text-center'>{productValue.name}</p>
                <p className='mb-0 text-center'>rs. {productValue.price}</p>
                <div className='text-center'>
                <button className='btn btn-outline-primary ' onClick={e=>checkoutHandle(e, productValue)}> buy </button>
                </div>
              </div>
            </div>
          )
        })}
        </div>
        
      </div>
    </section>
    </>
  )
}

export default Home