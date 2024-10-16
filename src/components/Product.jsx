
import React from 'react'
import {NavLink} from "react-router-dom"
import {useEffect,useState} from 'react'
import "./product.css"
import {useDispatch,useSelector} from "react-redux"
import { Add } from '../redux/cartslice'
const Product = () => {
  const [product, setproduct] = useState({})
  const dispatch= useDispatch();
  const pro=useSelector(state=>{

    return state.cart.value.id
    
    
  })

  const api=async()=>{
const res= await fetch(`https://dummyjson.com/products/${pro}`)
const data= await res.json();
setproduct(data);

}



useEffect(() => {
  api();

  }, [product])

  const add=()=>{
dispatch(Add({
  id:product.id,
  tit:product.title,
  img:product.thumbnail,
  price:product.price,
  quantity:1,
}))
}





  return (
    <div className='container'>
    <h1>{product.title}</h1>
 <div className='box'>
   <img src={product.thumbnail}  />
   <h2>Details:{product.description}</h2>
   <h2>Price:{product.price}</h2>
   <h2>Ratings:{product.rating}</h2>
 </div>
 <NavLink to="/cart"><button className='btn' onClick={add}>Add to Cart</button></NavLink>
</div>
  )
}

export default Product