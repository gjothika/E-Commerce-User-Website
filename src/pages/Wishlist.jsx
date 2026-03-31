import React, { useState ,useEffect } from 'react'
import axios from "axios"
import { useDispatch} from "react-redux";
import { setWishlistCount } from "../redux/wishlistSlice"
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../utils/Apiroutes'
const Wishlist = () => {
   
   const[wishlistItems,setWishlistItems]=useState([])
   const [loading,setLoading]=useState(true)
   const [userId, setUserId] = useState(localStorage.getItem("userId"))
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
       const interval = setInterval(() => {
         const current = localStorage.getItem("userId")
         setUserId(current)
       })
       return () => clearInterval(interval)
   }, [])
     useEffect(()=>{
    const userId=localStorage.getItem("userId")
     if(!userId){
        setWishlistItems([])
        return
       } 
    axios.get(`${API_ROUTES.GET_ALL_WISHLIST}/${userId}`)
    .then((res)=>{setWishlistItems(res.data)})
    .catch((err)=>{console.log(err)})
    .finally(()=>{setLoading(false)})
  },[userId])


  const handleRemove= async (item)=>{
          await axios.delete(`${API_ROUTES.DELETE_ALL_WISHLISTS}/${item._id}`)
          setWishlistItems(wishlistItems.filter(i=>i._id !== item._id))
          dispatch(setWishlistCount(wishlistItems.length - 1))
        }

         if (loading) {
     return (
    <div className="d-flex justify-content-center m-5">
      <div className="spinner-border"></div>
    </div>
  );
}

  return (
    <div className="m-md-3 m-2">
            <div className='row g-0 g-md-5'>
                <h2 className="mb-1">My WishList</h2>
                  {wishlistItems.length > 0 ?(
                  wishlistItems.map((item)=>(
                      <div className="col-6 col-md-3 d-flex mb-md-5 "> 
                 <div className="card h-100 w-100 border rounded-0 rounded-md" key={item._id} style={{width:"280px",cursor: "pointer"}} 
                  onClick={()=>navigate(`/Product/${item.productId._id}`)}>
                  <div className="position-relative">
                    <img src={item.variant?.image || item.productId?.image} className="card-img-top rounded-0" alt="..." height="250"></img>
                       <button type='button'className="btn p-0 border-0 bg-transparent">
                      <i onClick={(e)=>{e.stopPropagation();
                        handleRemove(item)}} className="bi bi-heart-fill position-absolute top-0 end-0 m-2"style={{fontSize:"20px",cursor:"pointer",color:"red"}}></i>
                         </button>
                  </div>          
            <div className="card-body">
              <h5 className="card-title mb-3" style={{whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>{item.productId.name}</h5>
              <div className="d-flex gap-1"style={{whiteSpace: "nowrap",textOverflow: "ellipsis"}}>
                  <h3 className="card-text fw-bold ">₹
                    {item.variant?.selling_price || item.productId?.selling_price}
                    </h3>
                  <h6 className="card-text text-muted text-decoration-line-through">₹{
                  item.variant?.actual_price || item.productId?.actual_price}</h6>
                  <h6 className="card-text text-success">{
                  item.variant?.discount || item.productId?.discount}% off</h6>
              </div>
              <span className="text-muted bg-light rounded px-2 my-2">Free Delivery</span>
              <div className="d-flex align-items-center gap-1 flex-nowrap mt-2 ">
              <span className="bg-success text-white fw-bold rounded-pill d-flex align-items-center justify-content-center"
                style={{fontSize: "12px",padding: "3px 6px",lineHeight: "2" }}>
                {item.productId.ratings}
                <i className="bi bi-star ms-1" style={{fontSize:"10px"}}></i>
              </span>
              <small className="text-muted pt-3 ">{item.productId.reviews} Reviews</small>
              </div>
            </div>
          </div>
          </div>
          ))
           ):( <h5>no data found</h5>
            )
          }
          </div>
    </div>
  )
}

export default Wishlist
