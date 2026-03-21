import React, { useState, useEffect } from 'react'
import {useLocation,useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTES } from '../utils/Apiroutes'
const Payment = () => {
      
      const { id } =useParams();
      const location = useLocation();
       const{product,variant,size,qty,address}=location.state ||{};
      const [payproduct,setPayproduct] = useState(product || null)
      const [payvariant, setPayVariant] = useState(variant || null);
      const [method,setMethod] = useState("")
      const navigate = useNavigate()

      useEffect(()=>{
                   axios.get(`${API_ROUTES.GET_ALL_PRODUCT}/${id}`)
                   .then((res)=>{
                      console.log(res.data)
                      setPayproduct(res.data.product)
                   })
                   .catch((err)=>{
                      console.log(err)
                   })
              },[id])

            const placeOrder = async ()=>{
            if(!method){
                alert("Please select payment method")
                return
            }
            const userId = localStorage.getItem("userId")
            const finalprice = method==="Online"? payvariant?.selling_price || payproduct?.selling_price : payvariant?.actual_price || payproduct?.actual_price
            const orderData = {
                userId:userId,
                productId:payproduct._id,
                productName:payproduct.name,
                price:finalprice,
                size:size,
                quantity:qty,
                image:payvariant?.image || payproduct?.image,
                paymentMethod:method,
                address:address
            }
            try{
                const res = await axios.post(API_ROUTES.POST_ALL_ORDER,orderData)
                alert("Order Placed Successfully")
                navigate(`/Ordersuccess/${payproduct._id}`)
            }catch(err){
                console.log(err)
            }
        }

  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card p-4 border-0">
                        <h5>Select Payment Method</h5>
                        <div className="card my-3 p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="px-3" style={{borderRight:"2px dotted gray"}}>₹{ payvariant?.actual_price || payproduct?.actual_price }</h5>
                            <h4 className="px-3">Cash On Delivery</h4>
                            <input className="ms-5" 
                                type="radio"
                                name="payment"
                                value="Cash On Delivery"
                                onChange={(e)=>setMethod(e.target.value)}style={{cursor:"pointer"}}
                          ></input>
                          </div>
                        </div>
                        <div className="card my-3 p-3">
                            <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <div className="pe-3 me-3"style={{borderRight:"2px dotted gray"}}>
                                <p className=" text-decoration-line-through m-0">₹{ payvariant?.actual_price || payproduct?.actual_price }</p>
                                <h5 className="m-0"style={{color:"green"}}>₹{ payvariant?.selling_price || payproduct?.selling_price }</h5>
                                <span className="border-0 px-1"style={{backgroundColor:"lightgreen",color:"green",fontSize:"12px",borderRadius:"4px"}}
                                >Save ₹{payvariant?.actual_price-payvariant?.selling_price || payproduct?.actual_price-payproduct?.selling_price}</span>
                            </div>
                            <div>
                            <h4 className="px-3 ">Pay Online</h4>
                            </div>
                            </div>
                            <input type="radio"
                                name="payment"
                                value="Online"
                                onChange={(e)=>setMethod(e.target.value)}style={{cursor:"pointer"}}
                          ></input>
                          </div>
                            <p className="pt-2 m-0">Extra discount with bank offers</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 ">
                <div className="card p-4 border-0 position-sticky" style={{top:"100px",width:"500px"}}>
                  <h5>Price Details (1 items)</h5>
                  <div className="d-flex justify-content-between pt-2 pe-5">
                    <p className="text-muted fw-bold">Product Price</p>
                    <p>+₹{ payvariant?.actual_price || payproduct?.actual_price }</p>
                    </div>
                     <div className="d-flex justify-content-between pt-3 pe-5 "style={{borderTop:"2px solid lightgray"}}>
                        <h5 className="text-muted">Order Total</h5>
                        <p>₹{payvariant?.actual_price || payproduct?.actual_price}</p>
                    </div>
                    <button className="border-0 rounded p-2 m-4 fw-bold"style={{backgroundColor:"purple",color:"white"}}
                    onClick={placeOrder}
                    >Place Order</button>
                </div>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default Payment