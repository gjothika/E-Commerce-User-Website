import React, { useState } from 'react'
import axios from 'axios'
const Login = ({ show, onClose }) => {
      const [Email,setEmail]=useState("");
      const[Password,setPassword]=useState("");
      if (!show) return null;

      // const handleSubmit = async (e) => {
      //   e.preventDefault();
      //       try{
      //           const res=await axios.post("http://localhost8000/Login",{
      //               Email,
      //               Password,
      //           });
      //           console.log(res.data);
      //           localStorage.setItem("user", JSON.stringify(res.data));
      //         setEmail("")
      //         setPassword("")
      //         onClose(); 
      //       } 
      //    catch(err){
      //      alert("wrong password")
      //    }
      //   }

         const handleSubmit = (e) => {
    e.preventDefault(); 
  
    axios.post("http://localhost:8000/Login", {
      Email: Email,
      Password: Password,
    })
    
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      //  setUser(res.data);
       
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

