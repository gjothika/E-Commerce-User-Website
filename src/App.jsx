import React, { useState ,useEffect} from 'react'
import buynestLogo from "../src/assets/buynest.png"
import Carousel from './component/Carousel'
import Category from './component/Category'
import Carousel1 from './component/Carousel1'
import Brand from './component/Brand'
import Product from './component/Product'
import Login from './component/Login'
import Carousel2 from './component/Carousel2'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Singleproduct from './pages/Singleproduct'
import Buyproduct from './pages/Buyproduct'
import Payment from './pages/Payment'
import Ordersuccess from './pages/Ordersuccess'
import Myorder from './pages/Myorder'
import Mysingleproduct from './pages/Mysingleproduct'
import Address from './pages/Address'
import axios from "axios"
import { useDispatch } from "react-redux"
import { setCartCount } from "./redux/cartSlice"
import { setWishlistCount } from './redux/wishlistSlice'
import { setWishlistItems } from './redux/wishlistSlice'
import { API_ROUTES } from './utils/Apiroutes'


const App = () => {

  const [showLogin,setShowLogin]=useState(false)

  const [user, setUser] = useState(null);

  const [showProfile, setShowProfile] = useState(false);

  const dispatch = useDispatch()
  const userId = localStorage.getItem("userId")
  

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const UserData = JSON.parse(savedUser);
    setUser(UserData);

    axios.get(`${API_ROUTES.GET_ALL_CARTCOUNT}/${UserData._id}`)
      .then((res) => {
        dispatch(setCartCount(res.data.count));
      })
      .catch(err => console.log(err));

    axios.get(`${API_ROUTES.GET_ALL_WISHLISTCOUNT}/${UserData._id}`)
    .then((res)=>{
      dispatch(setWishlistCount(res.data.count));
    })  
    .catch(err => console.log(err));
    
    axios.get(`${API_ROUTES.GET_ALL_WISHLIST}/${UserData._id}`)
  .then((res) => {
    const ids = res.data.map(item => item.productId._id)
    dispatch(setWishlistItems(ids))
  })
    
  }
}, []);

useEffect(() => {
  const handleOutsideClick = (e) => {
    if (!e.target.closest(".profile-wrapper")) {
      setShowProfile(false)
    }
  }
  document.addEventListener("mousedown", handleOutsideClick)
  return () => document.removeEventListener("mousedown", handleOutsideClick)
}, [])
  

  const cartCount= useSelector(state =>state.cart.count)
  const wishlistCount= useSelector(state =>state.wishlist.count)
 
  const handleLogout = () => {
  localStorage.removeItem("userId")
  localStorage.removeItem("user")
  setUser(null)
  dispatch(setCartCount(0));
  dispatch(setWishlistCount(0));  
  dispatch(setWishlistItems([])) //logout heart color remove       
  alert("Logged out successfully")
}

  return (
    <BrowserRouter>
    <div>
     <nav className="navbar custom-navbar sticky-top">
  <div className="container-fluid d-flex justify-content-between align-items-center">
    <Link to="/" className="navbar-brand logo">
      <img src={buynestLogo}  alt="logo" />
    </Link>
    <div className="right-section d-flex align-items-center">
      <Link to="/wishlist" className="icon-box">
        <i className="bi bi-heart"></i>
        {wishlistCount > 0 && (
          <span className="badge">{wishlistCount}</span>
        )}
      </Link>
      <Link to="/Cart" className="icon-box">
        <i className="bi bi-cart3"></i>
        {cartCount > 0 && (
          <span className="badge">{cartCount}</span>
        )}
      </Link>
      <div className="profile-wrapper">
        <div className="profile-box" onClick={() => setShowProfile(!showProfile)} >
          <i className="bi bi-person"></i>
        </div>
        {showProfile && (
          <div className="profile-dropdown shadow">
            {user ? (
              <>
                <p className="fw-bold mb-1">Hello {user.FirstName} {user.LastName}</p>
                <hr />
                <Link to={`/Myorder/${userId}`} className="dropdown-item">
                <i className="bi bi-bag me-2"></i>My Orders</Link>
                <span className="dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-left me-2"></i>Logout
                </span>
              </>
            ) : (
              <>
                <p className="fw-bold">Hello User</p>
                <button className="btn btn-primary w-100" onClick={() => {
                    setShowLogin(true);
                    setShowProfile(false);}}>
                  Sign Up / Login </button>
              </>
            )}
          </div>
        )}
      </div>

    </div>
  </div>
</nav>

<Login 
  show={showLogin} 
  onClose={() => setShowLogin(false)} 
  setUser={setUser} />
       
 <Routes>

<Route path="/" element={
  <>
    <Carousel />
    <Category />
    <Carousel1 />
    <Brand />
    <Carousel2 />
    <Product />
    </>
}/>
      <Route path="/Wishlist"element={<Wishlist />}/>
      <Route path="/Cart" element={<Cart />}/>
      <Route path="/product/:id" element={<Singleproduct />} />
      <Route path="/Buyproduct/:id" element={<Buyproduct />}/>
      <Route path="/Payment/:id" element={<Payment />}/>
      <Route path="/Ordersuccess/:id" element={<Ordersuccess />}/>
      <Route path="/Myorder/:userId" element={<Myorder />}/>
      <Route path="/Mysingleproduct/:userId/:productId" element={<Mysingleproduct />} />
      <Route path="/Address"element={<Address />}/>
</Routes>
     </div>
    </BrowserRouter>
   
  )
}

export default App