import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState = {
  carts:[],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    Add: (state,action) => {
      let index=state.carts.findIndex(item=>{
       return item.id===action.payload.id
     })

     if(index>=0){
     state.carts[index].quantity+=1

    }
    else{state.carts.push(action.payload);}
    localStorage.setItem("carts",JSON.stringify(state.carts))
  },

  Products:(state,action)=>{
    state.value=action.payload;
  
  },
  Viewcart:(state,action)=>{
    state.carts=action.payload;
  },

  Plus:(state,action)=>{
    let c=state.carts.map(elem=>{
   
      if(elem.id===action.payload){
        return {...elem,quantity:elem.quantity+1}
      }
      return elem;
    })
    state.carts=c;
    },

    Minus:(state,action)=>{
      let c=state.carts.map(elem=>{
        if(elem.id===action.payload){
          return {...elem,quantity:elem.quantity-1}
        }
        return elem;
      }).filter(elem=>{
        return elem.quantity>0
      })
      state.carts=c;
    },
      

Remove:(state,action)=>{
let r=state.carts.filter(elem=>{
  return elem.id!==action.payload
})
state.carts=r;
localStorage.setItem("carts",JSON.stringify(state.carts))
},
},
})

// Action creators are generated for each case reducer function
export const { Add,Products,Viewcart,Plus,Minus,Remove } = cartSlice.actions

export default cartSlice.reducer
  
   






         
       
          
     
     
  


   
    
   
      

      
  
    

      
    

      

