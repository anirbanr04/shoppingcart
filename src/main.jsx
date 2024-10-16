import { createRoot } from 'react-dom/client'
import Cart from "./components/Cart.jsx"
import{RouterProvider,createBrowserRouter} from "react-router-dom"
import{Provider} from "react-redux"
import store from "./redux/store.js"
 import App from './App.jsx'
 import Product from './components/Product.jsx'
import './index.css'



const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/product",
    element:<Product/>
  },
  {
    path:"/cart",
    element:<Cart/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
)
 

 
