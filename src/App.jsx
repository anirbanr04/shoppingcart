import React from 'react'
import { useState,useEffect } from 'react'
import "./App.css"
import {NavLink} from "react-router-dom"

import {useDispatch,useSelector} from "react-redux"
import {Products, Viewcart}  from './redux/cartslice'

const App = () => {
  const [pro, setpro] = useState([])
const dispatch=useDispatch();
const api=async()=>{
const res= await fetch("https://dummyjson.com/products/category/beauty")
const data= await res.json();
setpro(data.products);

}

const carts=useSelector(state=>{
  return state.cart.carts
})

useEffect(() => {
api();
let str=localStorage.getItem("carts")
let obj=JSON.parse(str)
dispatch(Viewcart(obj))
}, [])

  return (
    <div>
     <NavLink to="/cart"><button className='btn'>Cart ({carts.length})</button></NavLink>
    <div className='con'>
{pro.map(elem=>{
return <NavLink className="link" key={elem.id} to="/product"><div className='cont' onClick={()=>dispatch(Products(elem))}>
<h1>{elem.title}</h1>
<div className='boxz'>
<img src={elem.thumbnail}/>
<h2>Price: {elem.price}</h2><br/>
<h2>Category: {elem.category}</h2>
</div>
</div>
</NavLink>
})}

</div>
</div>
  )
}

export default App





