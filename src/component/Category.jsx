import React, { useEffect, useState } from 'react'
import axios from "axios"
import { API_ROUTES } from '../utils/Apiroutes'

const Category = () => {
      const [category,setCategory]=useState([])

      useEffect(()=>{
        axios.get(API_ROUTES.GET_ALL_CATEGORY)
        .then((res)=>{
          console.log(res.data);
          setCategory(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
      },[]);
  return (
    <div>
 <div className="row mx-5 my-5">
        {category.length > 0 ? (
          category.map((item,index)=>(
             <div className="col-6 col-md-2 mb-3" key={index}>
     <div className="card border-0 " style={{ width: "150px" }}>
  <img src={item.image} className="card-img-top" alt="..." style={{height:"150px"}}></img>
  <div className="card-body">
    <h5 className="card-title text-center">{item.name}</h5>
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