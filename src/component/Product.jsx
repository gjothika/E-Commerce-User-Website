import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, setWishlistItems } from '../redux/wishlistSlice';
import { toggleWishlist } from "../redux/wishlistSlice";
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../utils/Apiroutes'

const Product = () => {
    
    const dispatch = useDispatch();

    const [product,setProduct]=useState([]);

    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

    const navigate = useNavigate();
     
    useEffect(()=>{
        axios.get(API_ROUTES.GET_ALL_PRODUCT)
        .then((res)=>{
            setProduct(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[]);
  
const handleAddToWishlist = async (item) => {

  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first");
    return;
  }
    const isWishlisted = wishlistItems.includes(item._id);

  try {
     if(isWishlisted){
    await axios.delete(`${API_ROUTES.DELETE_ALL_WISHLIST}/${item._id}/${userId}`);
    
   } else{
    const variant =
      item.variants && item.variants.length > 0
        ? item.variants[0]
        : null;

    await axios.post(API_ROUTES.POST_ALL_WISHLIST, {
      productId: item._id,
      userId,
      variant
    });
   }
    dispatch(toggleWishlist(item._id));

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div>
        <div className='row g-0 g-md-5 mx-0'>
            <h2 className="pt-4">Products For You</h2>
       {product.length > 0 ?(
        product.map((item,index)=>(
            <div key={item._id} className="col-6 col-md-3 d-flex mb-md-5"> 
       <div className="card h-100 w-100 border rounded-0 rounded-md" style={{maxwidth:"280px",cursor:"pointer"}} 
       onClick={() => navigate(`/product/${item._id}`)}>
        <div className="position-relative">
          <img src={
            item.variants && item.variants.length>0 ?
            item.variants[0].image:item.image
          } className="card-img-top rounded-0" alt="..."  style={{ height: "230px" }}></img>
          <button type='button' onClick={(e) => {
            e.stopPropagation();
            handleAddToWishlist(item)}}>
         <i className={`bi ${ wishlistItems.includes(item._id)? "bi-heart-fill text-danger" : "bi-heart"} position-absolute top-0 end-0 m-2`}
         style={{ fontSize: "20px", cursor: "pointer" }}></i>
         </button>
        </div>  
  <div className="card-body">
    <h5 className="card-title mb-3" style={{whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>
      {item.name}</h5>
    <div className="d-flex gap-1">
        <h3 className="card-text fw-bold">₹
           {item.selling_price||item.variants[0].selling_price}</h3>
          <h6 className="card-text text-muted text-decoration-line-through">₹
            {item.actual_price ||item.variants[0].actual_price}</h6>
        <h6 className="card-text text-success">
          {item.discount||item.variants[0].discount}% off</h6>
    </div>
    <span className="text-muted bg-light rounded px-2 my-2">Free Delivery</span>
    <div className="d-flex align-items-center gap-1 ">
    <span className="bg-success text-white fw-bold rounded-pill px-1 py-1 my-3">{item.ratings}
        <i className="bi bi-star ms-2 "></i>
    </span>
    <small className="text-muted pt-3 ">{item.reviews} Reviews</small>
    </div>
  </div>
</div>
</div>
))
        ):(
          <h5>no data found</h5>
        )
}
</div>
    </div>
  )
}

export default Product