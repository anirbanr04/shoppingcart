import React from 'react'
import "./cart.css"
import {NavLink} from "react-router-dom"
import{useSelector,useDispatch} from "react-redux"
import { useEffect,useState,useRef } from 'react'
import { Minus, Plus, Remove, Viewcart } from '../redux/cartslice'

const Cart = () => {
  const dispatch=useDispatch()
  
  const cartss= useSelector(state=>{
   return state.cart.carts;
  })
 
useEffect(() => {
  let str=localStorage.getItem("carts")
  let obj=JSON.parse(str)
  dispatch(Viewcart(obj))
},[])




const total=cartss.reduce((sum,item)=>{
  let c=sum+(item.quantity*item.price);
  return c;
  },0) 

  const tquant=cartss.reduce((sum,item)=>{
    let c=sum+item.quantity;
    return c;
    },0) 
    
    
    const api=async()=>{
      const res= await fetch("http://localhost:3000/order",{
        method:"post",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({amount:total*100,
          currency:"INR",
          receipt:`receipt_id${Date.now()}`,

        }),
      });
      const orders=await res.json();

      const options = {
        key:"rzp_test_hAG91v5dqWhGR3", // Replace with your Razorpay key_id
        amount: total*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        order_id: orders.id, // This is the order_id created in the backend
        callback_url: 'http://localhost:3000/payment-success', // Your success URL
        prefill: {
          name: 'Anirban Roy',
          email: 'anirban.roy@example.com',
          contact: '8100465452'
        },
        handler: async function(response){
          alert(response.razorpay_payment_id);
        console.log(response)
      },
        theme: {
          color: '#F37254'
        },
      };
const razor= new Razorpay(options);
razor.open();
}

  



return (
<div className='main'>
<div className='containers'>
<NavLink to="/"><button className='btns'>Home</button></NavLink>
 <button className='btns'>Cart ({cartss.length})</button>

 <h1>Shopping Cart</h1>
 <h2>Cart Items:{cartss.length}</h2>
{cartss.map(elem=>{
 return <div key={elem.id} className="boxs">
      <img src={elem.img} />
      <h2>Item:{elem.tit}</h2>
      <h2>{elem.quantity}</h2>
      <button onClick={()=>dispatch(Minus(elem.id))} >-</button>
      <input type="number" min={1} value={elem.quantity}  />
      <button  onClick={()=>dispatch(Plus(elem.id))}>+</button>
      <h2>Price:{elem.price*elem.quantity}</h2>
   <button onClick={()=>dispatch(Remove(elem.id))}>X</button>
    
    </div> 
})}
  </div>
  <div className="summ">
  <h1>Summary</h1>
  <div className="boxs">
    <div className='inner'>
  <h2>Total Quantity</h2>
  <h2>{tquant}</h2>
  </div>
  <div className='inner'>
  <h2>Total Amount</h2>
  <h2>{total}</h2>
  </div>
  <button className='btnn' onClick={api}>Proceed to Checkout</button>
  </div>
  </div>
  </div>
)
}
export default Cart
  





   



      



















  

 







   
  
 
   



  

  



  





  
    
  

  










