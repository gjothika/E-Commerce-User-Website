import {useParams, useLocation} from 'react-router-dom';
import { Link } from "react-router-dom";
const Ordersuccess = () => {
    const { id } =useParams();
    const userId = localStorage.getItem("userId")
    const location = useLocation()
    const order = location.state?.order
  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className='card p-4 border-0 align-items-center justify-content-center'>
            <h3 style={{color:"green"}}>Order Placed, Thank you</h3>
            <p style={{color:"gray"}}>Your order has been placed sucessfully</p>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='card p-4 border-0'>
            <h5>Delivery address</h5>
            <p className="m-0">{order.address.house_no} {order.address.area}</p>
            <p>{order.address.city} {order.address.state}</p>
            <p className="m-0">Pincode - {order.address.pincode}</p>
            <p>{order.address.contact_no}</p>
            <Link to={`/Myorder/${userId}`}>View Order</Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card p-2 border-0">
            <h4 className="pb-2">Recently Viewed</h4>
            <img src={order.image} width="200" className="rounded"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ordersuccess