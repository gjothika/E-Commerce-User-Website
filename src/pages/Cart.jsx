
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setCartCount } from "../redux/cartSlice"
import { addToWishlist, setWishlistCount } from "../redux/wishlistSlice"
import { useNavigate } from 'react-router-dom'
const Cart = () => {

 const [cartItems,setCartItems]=useState([])
 const [userId, setUserId] = useState(localStorage.getItem("userId"))
 const dispatch = useDispatch();
 const wishlistCount = useSelector(state=>state.wishlist.count)
 const navigate = useNavigate();
 
useEffect(() => {
    const interval = setInterval(() => {
      const current = localStorage.getItem("userId")
      setUserId(current)
    }, 500)
    return () => clearInterval(interval)
}, [])
// useEffect(()=>{
//   const id = localStorage.getItems("userId")
//   setUserId(id)
// },[])

      useEffect(()=>{                                                             
        // const userId = localStorage.getItem("userId");
      if(!userId){
        setCartItems([])
        return
       }        
        axios.get(`http://localhost:8000/Cart/${userId}`)
        .then((res)=>{
          console.log(res.data);
          setCartItems(res.data)
        })          
        .catch((err)=>{
          console.log(err)
        })
      },[userId]);

      const handleRemove= async (item)=>{
        await axios.delete(`http://localhost:8000/Cart/${item._id}`)
        setCartItems(cartItems.filter(i=>i._id !== item._id))
        dispatch(setCartCount(cartItems.length ))
        return updated
      }

      const handleMoveToWishlist = async (item)=>{
        const userId = localStorage.getItem("userId");
        try{
          const res = await axios.post("http://localhost:8000/wishlist",{
            userId:userId,
            productId:item.productId._id,
            variant:item.variant
          });
          if(res.data.message==="Already exists"){
            await axios.delete(`http://localhost:8000/Cart/${item._id}`)
            setCartItems(prev=>{
               const updated = prev.filter(i => i._id !== item._id)
               dispatch(setCartCount(updated.length))
               return updated
    }) 
        }else{
     dispatch(setWishlistCount(wishlistCount+1))
   
    await axios.delete(`http://localhost:8000/Cart/${item._id}`)
            setCartItems(prev=>{
               const updated = prev.filter(i => i._id !== item._id)
               dispatch(setCartCount(updated.length))
               return updated
    }) 
        }
    //  alert("Moved to Wishlist")
        }catch(err){
          console.log(err)
        }
      }

      const totalPrice = cartItems.reduce((total, item) => {
  const price = item.variant?.selling_price || item.productId?.selling_price || 0
  return total + price * item.quantity
}, 0)

const totalActual = cartItems.reduce((total, item) => {
  const price = item.variant?.actual_price || item.productId?.actual_price || 0
  return total + price * item.quantity
}, 0)

const discount = totalActual - totalPrice

  return (
     <div>
<div className="product-page">
<div className="container">
  <div className="row">
    <div className="col">
    <div className="card p-4 border-0">
     <h2 className="mb-3">Product Details</h2>
       {cartItems && cartItems.length > 0 ?(
            cartItems.map((item)=>(
              <div className="card mb-3" style={{maxWidth: "500px"}} key={item._id}>
  <div className="row g-0">
    <div className="col-md-2 ">
      <img  onClick={()=>navigate(`/Product/${item.productId._id}`)}
      src={item.variant?.image || item.productId?.image} className="img-fluid rounded-start m-3 border rounded "  alt="..." style={{ height: "50px",width:"50px" ,cursor: "pointer"}}></img>
    </div>
    <div className="col-md-8">
     <div className="card-body ">
        <h5 className="card-title mb-2">{item.productId?.description}</h5>  
        <div className="d-flex gap-2">
            <h4 className="card-text fw-bold ">₹{
            item.variant?.selling_price || item.productId?.selling_price}
            </h4>
            <h6 className="card-text text-muted text-decoration-line-through">₹{
             item.variant?.actual_price || item.productId?.actual_price }</h6>
            <h6 className="card-text text-success">{
            item.variant?.discount || item.productId?.discount}% off</h6>
        </div>
        <p className="text-muted ">All issue easy return</p>
        <div className="d-flex align-items-center gap-4">
             <p className="text-muted ">Size:<span className='fw-bold'> {item.variant?.size}</span></p>
             <p className="text-muted ">Qty:{item.quantity}</p>
        </div>
      </div>
      </div>
      <div className="d-flex gap-3 justify-content-between p-2"style={{borderTop:"2px solid lightgray"}}>
           <button onClick={(e)=>{
            e.stopPropagation(),
            handleMoveToWishlist(item)}} className="border-0 bg-white text-muted">
            <i className="bi bi-heart m-2"style={{fontSize:"20px",cursor:"pointer"}}></i>Move to Wishlist
            </button>
           <button className="border-0 bg-white text-muted " onClick={(e)=>{
            e.stopPropagation(),
            handleRemove(item)}}>
            <i className="bi bi-x-lg mx-1 text-muted" style={{fontSize:"15px"}}></i>REMOVE</button>
        </div>
      </div>
  </div>
 ))
     ):( <h5>no data found</h5>
      )
    }

   </div> 
   </div>
   <div className="col-12 col-md-6 ">
    <div className="card p-4 border-0 position-sticky" style={{top:"100px",width:"500px"}}>
      <h5>Price Details ({cartItems.length} items)</h5>
      <div className="d-flex justify-content-between pt-2 pe-5">
        <p className="text-muted fw-bold">Product Price</p>
        <p>+₹{totalActual}</p>
      </div>
      <div className="d-flex justify-content-between pe-5">
        <p className="text-success fw-bold">Total Discounts</p>
        <p>-₹{discount}</p>
      </div>
      <div className="d-flex justify-content-between pt-2 pe-5"style={{borderTop:"2px solid lightgray"}}>
        <h5 className="text-muted">Order Total</h5>
        <p>₹{totalPrice}</p>
      </div>
      <button className="border-0 rounded p-2 mx-4 my-4"style={{backgroundColor:"lightgreen",color:"green"}}>% Yay! Your total discount is ₹{discount}</button>
        <p className="px-5">Clicking on 'Continue' will not deduct any money</p>
        <button className="border-0 rounded p-2 fw-bold mx-4 "style={{backgroundColor:"purple",color:"white"}}
        onClick={()=>navigate("/Address")}
        >Continue</button>
      </div>

    </div>
  </div>  
</div>
</div>

</div>
  )
}

export default Cart
