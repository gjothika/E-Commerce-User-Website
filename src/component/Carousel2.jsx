import React, { useEffect, useState } from 'react'
import axios from "axios"
import carosual4 from "../assets/carosual4.png"
const Carousel2 = () => {

const [card,setCard]=useState([])

useEffect(()=>{
    axios.get("http://localhost:8000/Card")
    .then((res)=>{
        setCard(res.data)
    })
     .catch((err)=>{
        console.log(err)
     })
},[])

  return (
       <div>
      
    <div className="position-relative"> 
          <img src={carosual4} className="w-100" alt="..."></img>
          {card.length>0 ?(
            <div className="position-absolute top-0 end-0 d-flex justify-content-center my-4" style={{left: "30%"}}>
             {card.map((item, index) => (
            <div key={index} className="text-center">
          <img className="product-img" src={item.image} alt="..." />
          <button type="button" className="product-btn bg-white  mt-2 rounded" 
          // style={{borderColor:"yellow",color:"purple",fontSize:"20px"}}
          >{item.name}</button>
        </div>
         ))}
           </div>
  ) : (
    <h5>not found</h5>
  )}
</div>
    </div>
  )
}

export default Carousel2