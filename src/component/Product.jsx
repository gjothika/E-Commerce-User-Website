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

    const [loading,setLoading]=useState(true)

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
        .finally(()=>{
          setLoading(false)
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
   
     if (loading) {
     return (
    <div className="d-flex justify-content-center m-5">
      <div className="spinner-border"></div>
    </div>
  );
}

  return (
    <div className="m-md-0 m-2">
        <div className='row g-md-5 mx-0'>
            <h2 className="pt-4">Products For You</h2>
       {product.length > 0 ?(
        product.map((item,index)=>(
            <div key={item._id} className="col-6 col-md-3 d-flex mb-md-2"> 
       <div className="card h-100 w-100 border rounded-0 rounded-md" style={{maxWidth:"280px",cursor:"pointer"}} 
       onClick={() => navigate(`/product/${item._id}`)}>
        <div className="position-relative">
          <img src={
            item.variants && item.variants.length>0 ?
            item.variants[0].image:item.image
          } className="card-img-top rounded-0" alt="product" height="250"></img>
          <button type='button'className="btn p-0 border-0 bg-transparent" onClick={(e) => {
            e.stopPropagation();
            handleAddToWishlist(item)}}>
         <i className={`bi ${ wishlistItems.includes(item._id)? "bi-heart-fill text-danger" : "bi-heart"} position-absolute top-0 end-0 m-2`}
         style={{ fontSize: "20px", cursor: "pointer" }}></i>
         </button>
        </div>  
  <div className="card-body">
    <h5 className="card-title mb-2 mb-md-3" style={{whiteSpace:"nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>
      {item.name}</h5>
    <div className="d-flex gap-1"style={{whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>
        <h3 className="card-text fw-bold">₹
           {item.selling_price||item.variants[0].selling_price}</h3>
          <h6 className="card-text text-muted text-decoration-line-through">₹
            {item.actual_price ||item.variants[0].actual_price}</h6>
        <h6 className="card-text text-success">
          {item.discount||item.variants[0].discount}% off</h6>
    </div>
    <span className="text-muted bg-light rounded px-2 my-2">Free Delivery</span>
    <div className="d-flex align-items-center gap-1 flex-nowrap mt-2">
    <span className="bg-success text-white fw-bold rounded-pill d-flex align-items-center justify-content-center"
  style={{fontSize: "12px",padding: "3px 6px",lineHeight: "2" }}>
  {item.ratings}
  <i className="bi bi-star-fill ms-1" style={{fontSize:"10px"}}></i>
</span>
    <small className="text-muted pt-3"style={{whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>{item.reviews} Reviews</small>
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