import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { setCartCount } from "../redux/cartSlice";
import { setWishlistCount, setWishlistItems } from "../redux/wishlistSlice";
import { API_ROUTES } from '../utils/Apiroutes'

const Login = ({ show, onClose,setUser }) => {
      const [Email,setEmail]=useState("");
      const[Password,setPassword]=useState("");
      const [isSignup, setIsSignup] = useState(false);
      const [FirstName, setFirstName] = useState("");
      const [LastName, setLastName] = useState("");
      const dispatch = useDispatch();
      
      if (!show) return null;
      
        
    const handleSubmit = (e) => {
    e.preventDefault(); 
  
    axios.post(API_ROUTES.POST_ALL_LOGIN, {
      Email: Email.trim(),
      Password: Password.trim(),
    })
    
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("userId", res.data._id)
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      axios.get(`${API_ROUTES.GET_ALL_CARTCOUNT}/${res.data._id}`)
    .then((response) => {
      dispatch(setCartCount(response.data.count));
    })
    .catch((err) => console.log(err));

    axios.get(`${API_ROUTES.GET_ALL_WISHLISTCOUNT}/${res.data._id}`)
    .then((response) => {
      dispatch(setWishlistCount(response.data.count));
      })
      .catch((err) => console.log(err));

      axios.get(`${API_ROUTES.GET_ALL_WISHLIST}/${res.data._id}`)
  .then((r) => {
    const ids = r.data
      .filter(item => item.productId !== null)
      .map(item => item.productId._id.toString())
    dispatch(setWishlistItems(ids))
  })
       
      setEmail("")
      setPassword("")
      onClose(); 
    })
    .catch((err) => {
      alert("Invalid Login");
    });
    }

    const handleSignup = (e) => {
  e.preventDefault();

  axios.post(API_ROUTES.POST_ALL_REGISTER, {
    FirstName,
    LastName,
    Email,
    Password,
  })
  .then((res) => {
    alert("Registered Successfully");

    setIsSignup(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  })
  .catch(() => {
    alert("Signup Failed");
  });
};
  return (
    <div>
        <div className="modal-overlay">
      <div className="modal-box">
      <div className="d-flex justify-content-between mb-3"style={{ cursor: "pointer"}}>
        <div><h3>{isSignup ? "Signup" : "Login"}</h3></div>
        <div className='icon'
        onClick={onClose}>
            <i className="bi bi-x border rounded "></i>
        </div>
      </div>  
      <form onSubmit={isSignup ? handleSignup : handleSubmit}>

  {isSignup && (
    <div>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input type="text" className="form-control" value={FirstName} onChange={(e) => setFirstName(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input type="text"className="form-control"value={LastName}onChange={(e) => setLastName(e.target.value)}/>
      </div>
    </div>
  )}

  <div className="mb-3">
    <label className="form-label">Email</label>
    <input type="email" className="form-control"value={Email} onChange={(e) => setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)}/>
  </div>

  <button type="submit" className="btn btn-primary w-100">
    {isSignup ? "Signup" : "Login"}
  </button>

</form>
<p className="text-center mt-3">
  {isSignup ? "Already have an account?" : "Don't have an account?"}
  <span
    style={{ color: "blue", cursor: "pointer" }}
    onClick={() => setIsSignup(!isSignup)}>
    {isSignup ? " Login" : " Signup"}
  </span>
</p>
</div>
</div>
    </div>
  )
}

export default Login

