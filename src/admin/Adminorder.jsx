import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Adminorder = () => {
    
    const [order,setOrder] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:8000/allorder")
        .then(res=>{
            setOrder(res.data)
        })
    },[])

  return (
    <div className="m-4">
      <h3>Recent Orders</h3>
        <table className="table border mt-3">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Order Id</th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
      <th scope="col">Product</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    {order.map((order,index)=>(
        <tr key={order._id}
        onClick={() => navigate(`/Admin/${order._id}`)} style={{cursor:"pointer"}}>
        <td>{index + 1}</td> 
        <td>{order._id}</td>
        <td>
  {new Date(order.createdAt).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
      )}
</td>  
        <td><button className="border-0 rounded py-1 px-2">{order.status}</button></td>
        <td>{order.productName}</td>
        <td>₹{order.price}</td>
        </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}

export default Adminorder