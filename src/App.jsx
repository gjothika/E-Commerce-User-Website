import React, { useState } from 'react'
import meeshoLogo from "../src/assets/meeshoLogo.svg"
import Carousel from './component/Carousel'
import Category from './component/Category'
import Carousel1 from './component/Carousel1'
import Brand from './component/Brand'
import Product from './component/Product'
import Login from './component/Login'
import Carousel2 from './component/Carousel2'
const App = () => {


  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

  const [showlogin,setShowLogin]=useState(false)

  return (
    <div>
      <nav className="navbar navbar-light bg-white sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={meeshoLogo} alt="" style={{width:200}}></img>
          </a>
          <form className="d-flex w-50">
            {/* <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span> */}
            <div className="position-relative w-100">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
            <input className="form-control me-2" type="search" placeholder="        Try Saree,kurti or Search by Product Code" aria-label="Search"></input>
            </div>
          </form>
          <div>
            <i className="bi bi-cart3" style={{cursor:"pointer"}}></i> Add to Cart
          </div>
          <div>
            <i className=""></i> Wish List
          </div>
          <div>
           {user ? (
            <span>{user.FirstName} {user.LastName} <i class="bi bi-box-arrow-right px-2" style={{cursor:"pointer"}} 
            onClick={() => {localStorage.removeItem("user"); 
                           setUser(null);                   
              }}></i></span>
             ) : (
             <a onClick={() => setShowLogin(true)} className="nav-link active " aria-current="page" href="#">Login</a>
             )}
            {/* <a onClick={() => setShowLogin(true)} className="nav-link active " aria-current="page" href="#">Login</a> */}
          </div>
        </div>      
      
        <Login show={showlogin} onClose={() => setShowLogin(false)}setUser={setUser} />

      </nav>

    
    <Carousel />
    <Category />
    <Carousel1 />
    <Brand />
    <Carousel2 />
    <Product />
    



    </div>
  )
}

export default App