import React from 'react'
import carosual4 from "../assets/carosual4.png"
const Carousel1 = () => {
  return (
    <div>
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={carosual4} class="d-block w-100" alt="..."></img>
    </div>
  </div>
</div>
    </div>
  )
}

export default Carousel1