import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { setCartCount } from "../redux/cartSlice";
import { setWishlistCount, setWishlistItems } from "../redux/wishlistSlice";

const Login = ({ show, onClose,setUser }) => {
      const [Email,setEmail]=useState("");
      const[Password,setPassword]=useState("");
      const dispatch = useDispatch();
      
      if (!show) return null;
      
        
    const handleSubmit = (e) => {
    e.preventDefault(); 
  
    axios.post("http://localhost:8000/login", {
      Email: Email.trim(),
      Password: Password.trim(),
    })
    
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("userId", res.data._id)
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      axios.get(`http://localhost:8000/cartCount/${res.data._id}`)
    .then((response) => {
      dispatch(setCartCount(response.data.count));
    })
    .catch((err) => console.log(err));

    axios.get(`http://localhost:8000/wishlistCount/${res.data._id}`)
    .then((response) => {
      dispatch(setWishlistCount(response.data.count));
      })
      .catch((err) => console.log(err));

      axios.get(`http://localhost:8000/wishlist/${res.data._id}`)
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
  return (
    <div>
        <div className="modal-overlay">
      <div className="modal-box">
      <div className="d-flex justify-content-between mb-3"style={{ cursor: "pointer"}}>
        <div><h3>Login</h3></div>
        <div className='icon'
        // onMouseEnter={(e) => e.target.style.color = "red"}
        // onMouseLeave={(e) => e.target.style.color = "black"}
        onClick={onClose}>
            <i className="bi bi-x border rounded "></i>
        </div>
      </div>  
        <form onSubmit={handleSubmit}>
  <div className="mb-3 ">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={Email} onChange={(e)=>setEmail (e.target.value)}></input>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={Password} onChange={(e)=>setPassword (e.target.value)}></input>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
</div>
    </div>
  )
}

export default Login

