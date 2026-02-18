import React from 'react'
import carosual1 from "../assets/carosual1.png"
import carosual2 from "../assets/carosual2.png"
// import carosual3 from "../assets/carosual3.png"
const Carousel = () => {
  return (
    <div>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={carosual1} class="d-block w-100" alt="..."></img>
    </div>
    <div class="carousel-item">
      <img src={carosual2} class="d-block w-100" alt="..."></img>
    </div>
    {/* <div class="carousel-item">
      <img src={carosual3} class="d-block w-100" alt="..."></img>
    </div> */}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<div class="container mt-3">

  <div class="border rounded p-3 bg-light">

    <div class="d-flex justify-content-around text-center">

      
      <div>
        <i class="bi bi-arrow-repeat fs-5 "></i>
        <span class="ms-2">7 Days Easy Return</span>
      </div>

     
      <div>
        <i class="bi bi-cash fs-5 "></i>
        <span class="ms-2">Cash on Delivery</span>
      </div>

      
      <div>
        <i class="bi bi-tag fs-5 "></i>
        <span class="ms-2">Lowest Prices</span>
      </div>

    </div>

  </div>

</div>


    </div>
  )
}

export default Carousel