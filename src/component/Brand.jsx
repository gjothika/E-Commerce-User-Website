import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_ROUTES } from '../utils/Apiroutes'

const Brand = () => {

    const [brand,setBrand]=useState([])
    
    useEffect(()=>{
        axios.get(API_ROUTES.GET_ALL_BRAND)
        .then((res)=>{
            setBrand(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
       }, [])

  return (
    <div>
        <div className="row my-5 mx-4 ">
            <h1>Original Brands</h1>
       {brand.length > 0 ? (
        brand.map((item,index)=>(
            <div className="col-6 col-md-2 my-3" >
            <div className="card border-0" style={{width: "180px"}}>
                 <img src={item.image} class="card-img-top" alt="..."></img>
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