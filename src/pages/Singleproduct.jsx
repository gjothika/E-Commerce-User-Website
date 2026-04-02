import React, { useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {addToCart}from "../redux/cartSlice"
import { useDispatch} from "react-redux";
import { API_ROUTES } from '../utils/Apiroutes'

const Singleproduct = () => {

    const { id } =useParams()
    const[singleproduct,setSingleproduct]= useState(null)
    const[selectvariant,setSelectVariant]= useState(null)
    const[selectsize,setSelectSize]=useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
         axios.get(`${API_ROUTES.GET_ALL_PRODUCT}/${id}`)
         .then((res)=>{
            console.log(res.data)
            setSingleproduct(res.data.product)
            if(res.data.product.variants.length>0){
                 setSelectVariant(res.data.product.variants[0])
                }  
             const sizes = res.data.product.variants[0]?.size || res.data.product.size
            if(Array.isArray(sizes) && sizes.length === 1){
            setSelectSize(sizes[0])
          }
         })
         .catch((err)=>{
            console.log(err)
         })

    },[id])
    
    if(!singleproduct){
        return <div className="d-flex justify-content-center m-5">
      <div className="spinner-border"></div>
    </div>
    }

    const handleAddToCart = async (item) => {
        console.log("item:",item)
      const userId = localStorage.getItem("userId")
      if (!userId) {
        alert("Please login first")
        return
      }
      
       const sizes = selectvariant?.size || singleproduct?.size
        if (!selectsize && (Array.isArray(sizes) ? sizes.length > 1 : true)) {
        alert("Please select size"); 
        return
      }
      try {
        const res = await axios.post(API_ROUTES.POST_ALL_CART, {
          userId: userId,
          productId: item._id,
          variant: {
            ...selectvariant,
            size:selectsize
          },
          quantity:1
        })
        if(!res.data.exists){
        dispatch(addToCart({
          ...item,
        variant:{
          ...selectvariant,
          size:selectsize
        }
      })) }
      } catch (err) {
        console.log(err)
      }
    }
   
     const autoSelectSize = (size) => {
  if (Array.isArray(size) && size.length === 1 && size[0] === "Free Size") {
    setSelectSize("Free Size")
  } else {
    setSelectSize(null)
  }
}

     const handleBuyNow = async () => {
              const userId = localStorage.getItem("userId")
              if (!userId) {
                alert("Please login first")
                return
              }
              const sizes = selectvariant?.size || singleproduct?.size
                if (!selectsize && (Array.isArray(sizes) ? sizes.length > 1 : true)) {
                alert("Please select size");
                return
              }

              navigate(`/Buyproduct/${singleproduct._id}`,{
              state:{
                variant:selectvariant,
                size:selectsize,
                quantity:1
              }})
            }
    

  return (
    <div className="overflow-hidden">
        <div className="row mx-0">
            <div className='col-12 col-md-4'>
              <div className="card  border rounded ms-md-5 mt-4" >
                 <img src={selectvariant?.image||singleproduct?.image} className="card-img-top px-3 " alt="..."style={{height:"auto",maxHeight:"400px",objectFit:"cover"}}></img>
              </div>
              <div className='d-flex ms-md-5 ms-2 mt-4 gap-2'>
                <button className="px-md-4 px-4 py-2 bg-white rounded fw-bold"style={{borderColor:"pink",color:"violet"}}
                onClick={()=>{
                handleAddToCart(singleproduct)}}><i class="bi bi-cart px-md-2 px-1"></i>Add to Cart</button>
                <button className="px-md-5 px-4 pe-5 py-2 border-0 rounded fw-bold"style={{backgroundColor:"violet",color:"white"}}
                onClick={()=>{
                  console.log("clicked")
                  handleBuyNow(singleproduct)
                  }}
                ><i class="bi bi-chevron-double-left px-md-2 px-1"></i>Buy Now</button>
              </div>
            <div className='mt-4 ms-md-5'style={{borderTop:"2px solid lightgray"}}>
                <h3 className=' mt-3 ms-2'>{singleproduct?.variants?.length > 0 ?
                                          `${singleproduct.variants.length} Similar Products`
                                         : "1 Similar Product"}</h3>
                  <div className="d-flex gap-3 mt-2 ms-2 overflow-auto mb-3">
                    {singleproduct?.variants?.length > 0 ?(
                     singleproduct.variants.map((variant) => (
                    <img src={variant.image}key={variant._id} className=' rounded' 
                     onClick={() => {setSelectVariant(variant)
                      autoSelectSize(variant.size)
                      }}
                   style={{height: "75px", width: "75px",cursor: "pointer",
                        border: selectvariant?._id === variant._id ? "3px solid violet " : "1px "
                    }}></img>
                 ))
                    ):(
                      <img src={singleproduct.image} className='rounded' style={{ height: "75px" ,width: "75px", objectFit: "cover",border: "2px solid violet"}}>
                      </img>
                    )}
                 </div>
              </div>
            </div>
            <div className="card border-0 rounded ms-md-5 mt-4 col-12 col-md-6">
            <div className='row px-2 px-md-0'>
                <div className='col-12 col-md-12 mb-3'>
                <div className="card  border rounded p-3" > 
                    <h5 class="card-title">{singleproduct.description}</h5>
                    <div className="d-flex gap-2">
                        <h4 className="card-text fw-bold ">₹
                        {singleproduct.selling_price||selectvariant.selling_price}</h4>
                        <h6 className="card-text text-muted text-decoration-line-through">₹
                          {singleproduct.actual_price||selectvariant.actual_price}</h6>
                        <h6 className="card-text text-success">
                          {singleproduct.discount||selectvariant.discount}% off</h6>
                        <h6 className="text-muted">onwards</h6>
                    </div>
                <div className="d-flex align-items-center gap-1 ">
                   <button className="btn btn-primary bg-success text-white fw-bold border-0 rounded-pill px-3 mx-1 my-3">{singleproduct.ratings}
                   <i className="bi bi-star ms-2 "></i></button>
                   <small className="text-muted pt-3 ">{singleproduct.rating} Ratings ,</small>
                   <small className="text-muted pt-3 ">{singleproduct.reviews} Reviews</small>
                </div>
                <button className="border-0 rounded text-muted p-1"style={{width:"130px"}}>Free Delivery</button>
               </div>
            </div>
            <div className='col-12 col-md-12 mb-3'>
                <div className="card  border rounded p-3"> 
                 <h4 className="card-text ">Select Size</h4>
                <div className="d-flex flex-wrap gap-2">
              {Array.isArray(selectvariant?.size || singleproduct?.size) &&
               (selectvariant?.size||singleproduct?.size).map((s,i)=>(
                <button className={`border rounded px-3 py-1 ${selectsize===s ? "bg-danger text-white" : "bg-white"}`}
                onClick={()=>{setSelectSize(s)}}
                key={i}>{s}</button>))}
                
               {typeof (selectvariant?.size || singleproduct?.size) && !Array.isArray((selectvariant?.size || singleproduct?.size)) &&
                Object.entries((selectvariant?.size || singleproduct?.size)).map(([size,price],i)=>(
                <button key={i} className={`border rounded px-3 py-1 ${selectsize===size ? "bg-danger text-white" : "bg-white"}`}
                onClick={()=>{setSelectSize(size)}}>
                <div>{size}</div>
                <div className="small text-muted">₹{price}</div>
                </button>))}
             </div>
            </div>
            </div>
             <div className='col-12 col-md-12'>
                <div className="card  border rounded p-3 mb-4"> 
                    <h4 className="card-text ">Product Highlights</h4>
                    <div className="row">
                    {Object.entries(selectvariant?.specifications || singleproduct?.specifications).map(([key,value],i)=>(
                    <div className="col-6 mb-3" key={i}>
                    <div className="text-muted" style={{fontSize:"13px"}}>{key}</div>
                    <div className="fw-semibold">{value}</div>
                    </div>))}
                  </div>
                </div>
            </div>
            </div>
        </div> 
       </div>
    </div>

  )
}

export default Singleproduct