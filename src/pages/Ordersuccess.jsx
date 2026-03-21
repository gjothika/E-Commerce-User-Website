import {useNavigate, useParams } from 'react-router-dom';
const Ordersuccess = () => {
    const { id } =useParams();
    const userId = localStorage.getItem("userId")
    const navigate = useNavigate()
    // const location = useLocation()
    // const order = location.state?.order
  return (
    <div className='container mt-4'>
      <div className='card p-2'>
        <h2>🎉 Order Placed Successfully!</h2>
        {/* <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Price:</strong> ₹{order.price}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p> */}
        <button onClick={()=>{navigate(`/Myorder/${userId}`)}} className="btn btn-primary border-0 rounded p-1 mb-3 w-25">View Order</button>
        <button onClick={()=>{navigate("/")}} className=" btn btn-primary border-0 rounded p-1 mb-3 w-25">Go Home</button>
      </div>
    </div>
  )
}

export default Ordersuccess