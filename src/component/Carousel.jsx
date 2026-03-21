import React from 'react'
import carosual1 from "../assets/carosual1.png"
import carosual2 from "../assets/carosual2.png"
import { API_ROUTES } from '../utils/Apiroutes'
const Carousel = () => {
  return (
    <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active position-relative">
      <img src={carosual1} className="d-block w-100" alt="..."></img>
      <div className="position-absolute top-50 end-0 carousel-text">
      <h1 className="me-5 mb-4 text-white">
        Smart Shopping<br></br>
        Trusted By Millions
      </h1>
      <button className="bg-white w-50 rounded border-0 mb-5 shop-btn"
       >Shop Now</button>
      </div>
    </div>
    <div className="carousel-item">
      <img src={carosual2} className="d-block w-100" alt="..."></img>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

<div className="container mt-3">

  <div className="border rounded p-3 bg-light">

    <div className="d-flex justify-content-around text-center">

      <div>
        <i className="bi bi-arrow-repeat fs-5 "></i>
        <span className="ms-2">7 Days Easy Return</span>
      </div>

      <div>
        <i className="bi bi-cash fs-5 "></i>
        <span className="ms-2">Cash on Delivery</span>
      </div>

      <div>
        <i className="bi bi-tag fs-5 "></i>
        <span className="ms-2">Lowest Prices</span>
      </div>

    </div>

  </div>

</div>


    </div>
  )
}

export default Carousel