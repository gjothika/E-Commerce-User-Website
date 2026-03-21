import {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

const Adminsingleorder = () => {

    const { orderId } = useParams()
    const [order,setOrder] = useState()

    useEffect(()=>{
        axios.get(`http://localhost:8000/order/${orderId}`)
        .then(res=>{
            setOrder(res.data)
        })
    },[orderId])

  const updatedStatus = async(status)=>{
        await axios.put(`http://localhost:8000/orderstatus/${order._id}`,{
          status:status
      })
      .then(res=>{
        setOrder(prev=>({
            ...prev,
            status:status
        }))
      })
    //   alert("Status Updated")
      }

      if(!order){
    return <h3>Loading...</h3>
  }

  return (
    <div className="container">
        <div className="card p-3" style={{maxWidth:"600px"}}>
            <p>Id:{order._id}</p>
            <p>{order.productName}</p>
            <p>₹{order.price}</p>
        <select style={{maxWidth:"200px",cursor:"pointer"}} className="rounded p-1"
        value={order.status}
        onChange={(e)=>updatedStatus(e.target.value)}>
            <option style={{maxWidth:"200px",cursor:"pointer"}}>Ordered</option>
            <option>Shipped</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
        </select>
        </div>
    </div>
  )
}

export default Adminsingleorder