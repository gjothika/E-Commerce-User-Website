import React,{useEffect,useState} from "react"
import {useNavigate, useParams } from 'react-router-dom';
import axios from "axios"

const MyOrders = () => {

    const { userId } =useParams();
    const [orders,setOrders] = useState([])
    const userid = localStorage.getItem("userId")
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/myorders/${userid}`)
        .then(res=>{
        setOrders(res.data)
        })
    },[])

return(
<div>
    {orders.length > 0 ? (
    <div className="container">   
    {orders.map((item)=>(
        <div className="card p-2  mt-4" key={item._id} 
        onClick={() => navigate(`/Mysingleproduct/${userId}/${item.productId}`,{
            state:{
                image:orders.image
            }
        })}style={{cursor:"pointer",maxWidth:"500px"}}>
            <div className="d-flex">
                <img src={item.image} width="100" className="rounded"></img>
                <div className="ms-3">
                    <p className="m-0">{item.productName}</p>
                    <p className="m-0">Size: {item.size} . Qty: {item.quantity}</p>
                    <p>Ordered on {new Date(item.createdAt).toLocaleDateString("en-IN",{
                        weekday:"short",day:"2-digit",month:"short"})}</p>
                    <p className=" text-muted ">All issuse easy returns</p>
                </div>
            </div>
        </div>
    ))}
    </div>
     ):( <h5>no data found</h5>
            )
          }
</div>
)

}

export default MyOrders