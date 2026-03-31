import React, { useEffect, useState } from 'react'
import axios from "axios"
import { API_ROUTES } from '../utils/Apiroutes'

const Category = () => {
      const [category,setCategory]=useState([])
      const [loading,setLoading]=useState(true)

      useEffect(()=>{
        axios.get(API_ROUTES.GET_ALL_CATEGORY)
        .then((res)=>{
          console.log(res.data);
          setCategory(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setLoading(false)
        })
      },[]);

       if (loading) {
     return (
    <div className="d-flex justify-content-center m-5">
      <div className="spinner-border"></div>
    </div>
  );
}

  return (
    <div>
 <div className="row mx-5 my-5">
        {category.length > 0 ? (
          category.map((item,index)=>(
             <div className="col-6 col-md-2 mb-3" key={index}>
     <div className="card border-0 h-100" style={{ maxWidth: "150px" }}>
  <img src={item.image} className="card-img-top img-fluid" alt=""style={{ objectFit: "cover"}}></img>
  <div className="card-body">
    <p className="text-center" style={{fontSize: "15px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>
  {item.name}
</p>
  </div>
    </div>
     </div>
          ))
        ):(
          <h5>no data found</h5>
        )
}
</div>
    </div>
  )}
export default Category