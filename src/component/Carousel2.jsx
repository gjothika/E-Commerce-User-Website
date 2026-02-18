import React, { useEffect, useState } from 'react'
import axios from "axios"
const Carousel2 = () => {

const [card,setCard]=useState([])

useEffect(()=>{
    axios.get("http://localhost:8000/getdata")
    .then((res)=>{
        setCard(res.data)
    })
     .catch((err)=>{
        console.log(err)
     })
},[])

  return (
      <div>

      {/* <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <h1 class="card-title">35% OFF</h1>
      <h5 class="card-title">On First Order</h5>
      <h5 class="card-title">35% OFF</h5>
      <p class="card-text">On First Order</p>
    </div>
    <div class="col-md-8">
      {card.length > 0 && (<div class="card-body" style={{ width: "200px" }}>
        <img  src={card[0].image} className="card-img-top" alt="carousel-img" />
         <button type="button" class="btn btn-primary ">{card[0].name}</button>
      </div>
        
     )}
    </div>
  </div>
</div>
    */}



{card.length>0 &&(
  <div class="card mb-3">
  <img src={card[0].image} class="card-img-top" alt="..."></img>
  </div>
)}


    </div>
  )
}

export default Carousel2