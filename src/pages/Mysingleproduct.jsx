import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { API_ROUTES } from '../utils/Apiroutes'

const Mysingleproduct = () => {

  const { userId, productId } = useParams()

  const [product,setProduct] = useState(null)
  const steps = ["Ordered","Shipped", "Out for Delivery","Delivered"]
  const currentStep = steps.indexOf(product?.status)
  const navigate = useNavigate()
  const location = useLocation()
  const selectedImage = location.state?.image

  useEffect(()=>{

    axios.get(`${API_ROUTES.GET_ALL_MYSINGLEPRODUCT}/${userId}/${productId}`)
    .then((res)=>{
      setProduct(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })

  },[userId,productId])

  if(!product){
    return <h3>Loading...</h3>
  }

  return (
    <div>
        <div className="container">
        <div className="card p-2 my-4" 
        onClick={() => navigate(`/Product/${product.productId}`)}style={{cursor:"pointer",maxWidth:"600px"}}>
            <div className="d-flex">
                <img src={selectedImage || product.image} width="170" className="rounded"></img>
                <div className="ms-3">
                    <h5 className="m-1">{product.productName}</h5>
                    <h6 className="m-1">₹{product.price}</h6>
                    <p className="m-1">Size: {product.size} . Qty: {product.quantity}</p>
                    <p>Ordered on {new Date(product.createdAt).toLocaleDateString("en-IN",{
                        weekday:"short",day:"2-digit",month:"short"})}</p>
                    <p className=" text-muted ">All issuse easy returns</p>
                </div>
            </div>
        </div>

        <div className='card p-2 mb-4'style={{maxWidth:"600px"}}>
            <div className="d-flex justify-content-between align-items-center mt-4">
                {steps.map((step,index)=>(
                    <React.Fragment key={index}>
                    <div className="text-center"  style={{flex:1}}>
                        <div style={{
                            width:"20px",
                            height:"20px",
                            borderRadius:"50%",
                            margin:"auto",
                            backgroundColor:index <= currentStep? "green":"lightgray",
                            display:"flex",
                            alignItems:"center",
                            color:"white",
                            fontSize:"12px",
                            padding:"5px"
                        }}>
                            {index <= currentStep? "✓":""}
                        </div>
                        {/* <p style={{fontSize:"12px",marginTop:"5px"}}>{step}</p> */}
                    </div>
                    {index !== steps.length-1 && (
                        <div style={{
                            flex:1,
                            height:"3px",
                            backgroundColor:index <= currentStep? "green":"lightgray"
                        }}></div>
                    )}
                    </React.Fragment>
                ))}
            </div>
            <div className="d-flex justify-content-between mt-2">
               {steps.map((step,index)=>(
                <div key={index} style={{fontSize:"12px",margin:1}} className="ps-3">{step}</div>
               ))}
            </div>
        </div>

        <div className="card p-2"style={{maxWidth:"600px"}}>
            <h5>Delivery Address</h5>
            <h6>{product?.address?.name}</h6>
            <p>{`${product?.address?.house_no} , ${product?.address?.area} , ${product?.address?.city} , ${product?.address?.state} , ${product?.address?.pincode}`}</p>
            <p>{product?.address?.contact_no}</p>
        </div>
        
    </div>
    </div>
  )
}

export default Mysingleproduct