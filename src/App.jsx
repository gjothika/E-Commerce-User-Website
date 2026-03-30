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

  const [showlogin,setShowLogin]=useState(false)

  const [user, setUser] = useState(null);

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
      <nav className="navbar navbar-light bg-white sticky-top">
        <div className="container-fluid d-flex justify-content-between align-items-center px-3">
          <a className="navbar-brand" href="#">
            <img src={buynestLogo} alt="" style={{width:200}}></img>
          </a>
          <form className="d-flex w-50">
            <div className="position-relative w-100">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
            <input className="form-control me-2 px-5" type="search" placeholder="Try Saree,kurti or Search by Product Code" aria-label="Search"></input>
            </div>
          </form>
          <div className="position-relative">
            <Link to="/wishlist" style={{textDecoration:"none", color:"black"}}>
               <i className="bi bi-heart" style={{cursor:"pointer", fontSize:"20px"}}></i>
               {wishlistCount > 0 && (
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "style={{backgroundColor:"red"}}>
        {wishlistCount}
      </span>
    )}
           </Link>
          </div>
          <div className="position-relative">
            <Link to="/Cart" style={{textDecoration:"none", color:"black"}}>
            <i className="bi bi-cart3" style={{cursor:"pointer", fontSize:"20px"}}></i>
               {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill  bg-danger">{cartCount}</span>
              )}</Link>
              </div>
          <div>
           {user ? (
            <span>{user.FirstName} {user.LastName} <i className="bi bi-box-arrow-right px-2" style={{cursor:"pointer"}} 
            onClick={handleLogout}></i>
            <i className="bi bi-bag px-2" style={{cursor:"pointer"}}><Link
             to={`/Myorder/${userId}`}
      style={{ textDecoration: "none", color: "black" }}
      className="px-2"
             >My Order</Link></i>
            </span>
             ) : (
             <a onClick={() => setShowLogin(true)} className="nav-link active " aria-current="page" href="#"><i className="bi bi-person px-1"style={{cursor:"pointer", fontSize:"20px"}}></i>Login</a>
             )}
          </div>
        </div>      
      
        <Login show={showlogin} onClose={() => setShowLogin(false)} setUser={setUser} />

      </nav>
       
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