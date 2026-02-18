import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Brand = () => {

    const [brand,setBrand]=useState([])
    
    useEffect(()=>{
        axios.get("http://localhost:8000/Brand")
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
            <div className="col mx-3 my-4">
            <div classNmae="card" style={{width: "200px"}}>
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