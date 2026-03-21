import React, { useState ,useEffect } from 'react'
import axios from "axios"
import { useDispatch} from "react-redux";
import { setWishlistCount } from "../redux/wishlistSlice"
import { useNavigate } from 'react-router-dom';
const Wishlist = () => {
   
   const[wishlistItems,setWishlistItems]=useState([])
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
    axios.get(`http://localhost:8000/wishlist/${userId}`)
    .then((res)=>{setWishlistItems(res.data)})
    .catch((err)=>{console.log(err)})
  },[userId])

  const handleRemove= async (item)=>{
          await axios.delete(`http://localhost:8000/Wishlist/${item._id}`)
          setWishlistItems(wishlistItems.filter(i=>i._id !== item._id))
          dispatch(setWishlistCount(wishlistItems.length - 1))
        }

  return (
    <div>
            <div className='row'>
                <h2 className="mb-3">My WishList</h2>
                  {wishlistItems.length > 0 ?(
                  wishlistItems.map((item)=>(
                      <div className="col-12 col-md-3 d-flex mb-5"> 
                 <div className="card h-100"key={item._id} style={{width:"280px",cursor: "pointer"}} 
                  onClick={()=>navigate(`/Product/${item.productId._id}`)}>
                  <div className="position-relative">
                    <img src={item.variant?.image || item.productId?.image} className="card-img-top" alt="..."  style={{ height: "250px" }}></img>
                       <button>
                      <i onClick={(e)=>{e.stopPropagation();
                        handleRemove(item)}} className="bi bi-heart-fill position-absolute top-0 end-0 m-2"style={{fontSize:"20px",cursor:"pointer",color:"red"}}></i>
                         </button>
                  </div>          
            <div className="card-body">
              <h5 className="card-title">{item.productId.name}</h5>
              <div className="d-flex gap-3">
                  <h2 className="card-text fw-bold ">₹
                    {item.variant?.selling_price || item.productId?.selling_price}
                    </h2>
                  <h5 className="card-text text-muted text-decoration-line-through">₹{
                  item.variant?.actual_price || item.productId?.actual_price}</h5>
                  <h5 className="card-text text-success">{
                  item.variant?.discount || item.productId?.discount}% off</h5>
              </div>
              <p className="text-muted ">Free Delivery</p>
              <div className="d-flex align-items-center gap-1 ">
              <button className="btn btn-primary bg-success text-white fw-bold border-0 rounded-pill px-3 mx-1 my-3">{item.productId.ratings}
                  <i className="bi bi-star ms-2 "></i>
              </button>
              <p className="text-muted pt-3 ">{item.productId.reviews} Reviews</p>
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
