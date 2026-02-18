
import React, { useEffect, useState } from 'react'
import axios from "axios"
const Product = () => {

    const [product,setProduct]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/Product")
        .then((res)=>{
            setProduct(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[]);

  return (
    <div>
        <div className='row '>
            <h2 className="mb-3">Products For You</h2>
       {product.length > 0 ?(
        product.map((item,index)=>(
            <div className="col d-flex "> 
       <div className="card h-100" style={{width:"280px"}}>
  <img src={item.image} className="card-img-top" alt="..."  style={{ height: "250px" }}></img>
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <div className="d-flex gap-3">
        <h2 className="card-text fw-bold ">₹{item.selling_price}</h2>
        <h5 className="card-text text-muted text-decoration-line-through">₹{item.actual_price}</h5>
        <h5 className="card-text text-success">{item.discount}</h5>
    </div>
    <p className="text-muted ">Free Delivery</p>
    <div className="d-flex align-items-center gap-1 ">
    <a href="" className="btn btn-primary bg-success text-white fw-bold border-0 rounded-pill px-3 mx-1 my-3">{item.ratings}
        <i className="bi bi-star ms-2 "></i>
    </a>
    <p className="text-muted pt-3 ">{item.reviews} Reviews</p>
    </div>
    <div className="d-flex gap-2">
        <a href="" className="btn btn-primary">Add to Cart</a>
        <a href="" className="btn btn-primary">Add to wishlist</a>
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