import React, { useState ,useEffect} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTES } from '../utils/Apiroutes'
const Buyproduct = () => {

    const { id } =useParams();
    const[buyproduct,setBuyproduct]= useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const{variant,size,quantity}=location.state ||{};
    const [buyvariant, setBuyVariant] = useState(variant || null);
    const [buysize, setBuySize] = useState(size || null);
    const [buyqty, setBuyQty] = useState(quantity || 1);
    const [address,setAddress]=useState({
      name:"",
      contact_no:"",
      house_no:"",
      area:"",
      pincode:"",
      city:"",
      state:"",
      landmark:""
    })
    const [addresslist,setAddressList] = useState([])
    const [editmode,setEditMode] = useState(false)
    const [editid,setEdtitId] = useState(null)

     useEffect(()=>{
             axios.get(`${API_ROUTES.GET_ALL_PRODUCT}/${id}`)
             .then((res)=>{
                console.log(res.data)
                setBuyproduct(res.data.product)
             })
             .catch((err)=>{
                console.log(err)
             })
                fetchAddress()
        },[id])
   
         const handlechange = (e)=>{
          setAddress({
            ...address,
            [e.target.name]:e.target.value
          })
         }

         const handlesaveaddress = async(e)=>{
          e.preventDefault()
          const userId = localStorage.getItem("userId")
           try{
            if(editmode){
              const res = await axios.put(`${API_ROUTES.PUT_ALL_ADDRESS}/${editid}`,address
              )
              alert("Address Updated")
              setEditMode(false)
              setEdtitId(null)
            
             }else{
              const res = await axios.post(API_ROUTES.POST_ALL_ADDRESS,{
              userId:userId,
              ...address
            })
            console.log(res.data)
            alert("Saved Address")
          }
            setAddress({
               name:"",
               contact_no:"",
               house_no:"",
               area:"",
               pincode:"",
               city:"",
               state:"",
               landmark:""
            })
             fetchAddress()

          }catch(err){
            console.log(err)
          }
         }

         const fetchAddress = async () =>{
          const userId = localStorage.getItem("userId")
          try{
            const res = await axios.get(`${API_ROUTES.GET_ALL_ADDRESS}/${userId}`)
            console.log(res.data)
            setAddressList(res.data)
          }catch(err){
            console.log(err)
          }
         }
    
        if(!buyproduct){
            return <h3>Loding....</h3>
        }

  return (
    <div>
        <div>
          <div className="container">
            <div className="row">
              <div className="col">

                <div className="card p-4 border-0">
                  <h5>Buy Product</h5>
            <div className="card mb-3 " style={{maxWidth: "500px"}}>
            <div className="row g-0">
                <div className="col-md-2 ">
                <img 
                 onClick={()=>navigate(`/Product/${buyproduct._id}`)}
                src={buyvariant?.image || buyproduct?.image} className="img-fluid rounded-start m-3 border rounded "  alt="..." style={{ height: "50px",width:"50px" ,cursor: "pointer"}}></img>
                </div> 
                
                <div className="col-md-8">
                <div className="card-body ">
                   <h5 className="card-title mb-2"style={{maxWidth: "500px"}}>{buyproduct?.description}</h5>  
                   <div className="d-flex gap-2">
                   <h5 className="card-text fw-bold ">₹{
                    buyvariant?.selling_price || buyproduct?.selling_price}</h5>
                   <h6 className="card-text text-muted text-decoration-line-through">₹{
                    buyvariant?.actual_price || buyproduct?.actual_price }</h6>
                    <h6 className="card-text text-success">{
                    buyvariant?.discount || buyproduct?.discount}% off</h6>
                </div>
                <div className="d-flex align-items-center gap-4">
                   <p className="text-muted ">Size:<span className='fw-bold'> {buysize}</span></p>
                   <p className="text-muted ">Qty:{buyqty}</p>
               </div>
              </div>
            </div> 
            <div className="d-flex  justify-content-between pt-2 pe-3"style={{borderTop:"2px solid lightgray"}}>
           <p className="text-muted"></p>
           <p className="text-muted">Free Delivery</p>
           </div>       
            </div>
            </div>
            
             <h5>Delivery Address</h5>
             {addresslist.length === 0 || editmode?(
              <div className="card p-4 mb-3" style={{maxWidth: "500px"}}>
                <div className="col-md-8">
                  <h6>Contact Details</h6>
                <input type="text" name="name" className="form-control mb-3"placeholder="Name"onChange={handlechange}value={address.name}></input>
                <input type="number" name="contact_no" className="form-control mb-3"placeholder="Contact Number"onChange={handlechange}value={address.contact_no}></input>
                <h6>Address</h6>
                <input type="text"name="house_no" className="form-control mb-3"placeholder="House.no/Building name"onChange={handlechange}value={address.house_no}></input>
                <input type="text" name="area" className="form-control mb-3"placeholder="Road name/Area/Colony"onChange={handlechange}value={address.area}></input>
                <input type="number" name="pincode"className="form-control mb-3"placeholder="Pincode"onChange={handlechange}value={address.pincode}></input>
                <input type="text" name="city" className="form-control mb-3"placeholder="City"onChange={handlechange}value={address.city}></input>
                <select name="state" className="form-control mb-3"onChange={handlechange}value={address.state}>
                  <option>State</option>
                  <option>Tamil Nadu</option>
                  <option>Karnataka</option>
                  <option>Kerala</option>
                </select>
                <input type="text"name="landmark" className="form-control mb-3"placeholder="Nearby Famous Place/Shop/School,etc(optional)"onChange={handlechange}value={address.landmark}></input>
                <button type="submit"onClick={handlesaveaddress} className="btn btn-primary">{editmode ? "Update Address" : "Save Address"}</button>
              </div>
            </div>
            ) : (
            <div className="card p-3 mb-3" style={{maxWidth:"500px"}}>
               {addresslist.map((addr)=>(
              <div key={addr._id} className="text-muted">
                <div className="d-flex justify-content-between">
              <h5 className="fw-bold">{addr.name}</h5>
              <h5> <button className="border-0 bg-white"style={{color:"purple"}} onClick={()=>{
                setAddress(addr)
                setEditMode(true)
                setEdtitId(addr._id)
              }}>change</button></h5></div>
              <p>{addr.house_no}, {addr.area}</p>
              <p>{addr.city}, {addr.state} - {addr.pincode}</p>
              <p>{addr.contact_no}</p>
            </div>
            ))}
          </div>
            )} 
          </div>
          </div>
                    
              <div className="col-12 col-md-6 ">
                <div className="card p-4 border-0 position-sticky" style={{top:"100px",width:"500px"}}>
                  <h5>Price Details (1 items)</h5>
                  <div className="d-flex justify-content-between pt-2 pe-5">
                    <p className="text-muted fw-bold">Product Price</p>
                    <p>+₹{ buyvariant?.actual_price || buyproduct?.actual_price }</p>
                  </div>
                  <div className="d-flex justify-content-between pe-5">
                    <p className="text-success fw-bold">Total Discounts</p>
                    <p>-₹{buyvariant?.actual_price-buyvariant?.selling_price || buyproduct?.actual_price-buyproduct?.selling_price}</p>
                  </div>
                  <div className="d-flex justify-content-between pt-2 pe-5"style={{borderTop:"2px solid lightgray"}}>
                    <h5 className="text-muted">Order Total</h5>
                    <p>₹{buyvariant?.selling_price || buyproduct?.selling_price}</p>
                </div>
                <button className="border-0 rounded p-2 mx-4 my-4"style={{backgroundColor:"lightgreen",color:"green"}}>% Yay! Your total discount is ₹{buyvariant?.actual_price-buyvariant?.selling_price || buyproduct?.actual_price-buyproduct?.selling_price}</button>
                <p className="px-5">Clicking on 'Continue' will not deduct any money</p>
                <button className="border-0 rounded p-2 fw-bold mx-4 "style={{backgroundColor:"purple",color:"white"}}
                onClick={()=>navigate(`/payment/${buyproduct._id}`,{
                          state:{
                            product:buyproduct,
                            image:buyvariant?.image || buyproduct?.image,
                            variant:buyvariant,
                            size:buysize,
                            qty:buyqty,
                            address:addresslist[0]
                          }
                        })}
                >Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Buyproduct