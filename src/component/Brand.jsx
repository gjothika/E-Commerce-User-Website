import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_ROUTES } from '../utils/Apiroutes'

const Brand = () => {

    const [brand,setBrand]=useState([])
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{
        axios.get(API_ROUTES.GET_ALL_BRAND)
        .then((res)=>{
            setBrand(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setLoading(false)
        })
       }, [])

    if (loading) {
     return (
    <div className="d-flex justify-content-center m-5">
      <div className="spinner-border"></div>
    </div>
  );
}

  return (
    <div>
        <div className="row my-5 mx-4 ">
            <h1 className="pb-3">Original Brands</h1>
       {brand.length > 0 ? (
        brand.map((item,index)=>(
            <div className="col-6 col-md-3 mb-4" key={index}>
            <div className="card border-0 h-100" style={{maxWidth:"220px"}}>
                 <img src={item.image} className="card-img-top img-fluid" alt="brand"style={{ objectFit: "cover" }}></img>
            </div>
            </div>
        ))   
    ):(
        <h5>Data no found</h5>
    ) 
        }
        </div>
    </div>
)}

export default Brand