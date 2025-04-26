import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ProfileCard from './ProfileCard';
function Myconnections() {
    const [connections,setconnections]=useState([]);
    useEffect(()=>{
        async function getconnections(params) {
            const res=await axios.get('http://localhost:3000/user/connections',{
                withCredentials:true
            })
            console.log(res?.data?.connections,"user ka");
            
            setconnections(res?.data?.connections)
            
            
        }
        getconnections()
    },[])
    if (!connections) {
        return <h1 className='w-full bg-gray-900 px-10 pt-30 text-white min-h-screen'>Loading...</h1>    
    }
    if(connections.length===0){
        return <h1 className='w-full bg-gray-900 px-10 pt-30 text-white min-h-screen font-bold'>No connections found</h1>
    }
  return (
    <div className='w-full bg-gray-900 px-10 pt-30 text-white min-h-screen flex-wrap gap-12 flex  '>
        {
            connections.map((conn)=><ProfileCard user={conn} isEdit={true}></ProfileCard>)
        }
    </div>
  )
}

export default Myconnections