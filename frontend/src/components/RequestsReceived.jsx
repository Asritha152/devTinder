import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RequestsReceived() {
    const [requests,setrequests]=useState([]);
      const handleClick=async (status,req)=>{
        try{
          await axios.post(`http://localhost:3000/request/review/${status}/${req._id}`,{},{
            withCredentials:true
          })
          
        setrequests(requests.filter(u=>u._id!==req._id));
          console.log(status+" request sent successfully");
        }
        catch(error){
          console.log(error.message);
          
        }
        
        
      }
    async function getrequests(params) {
        try {
            const res=await axios.get('http://localhost:3000/user/requestsreceived',{
                withCredentials:true
            })
            setrequests(res?.data?.requestsReceived)

        } catch (error) {
            console.log(error.message);
            
            
        }
       
        
    }
    useEffect(()=>{
        getrequests();
    },[])
    if(!requests) return <h1 className='w-full bg-gray-900 px-10 pt-30 text-white min-h-screen  '>Loading.</h1>
    if(requests.length===0) return <h1 className='w-full bg-gray-900 px-10 pt-30 text-white min-h-screen  font-bold'>No Requests found</h1>
  return (
    <div className='w-full bg-gray-900 px-10 pt-30 text-white min-h-screen flex-wrap gap-12 flex  '>
    {requests.map((req)=>{
        const user=req.fromUserId
        return   <div className="w-[400px] max-w-md h-full bg-gray-800 p-6 space-y-4 rounded-xl">
        <div className="w-40 h-40 bg-gray-700 overflow-hidden rounded-full mx-auto flex items-center justify-center text-white">
          <img src={`${user.profileURL}`} alt="" className='w-full h-full object-cover' />
        </div>
  
        <h1 className="text-2xl font-bold text-center text-white">{user.firstName + " " + user.lastName}</h1>
  
        <div className="flex flex-wrap justify-center gap-2">
          {user.skills.map((skill, index) => (
            <span key={index} className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
  
        <p className="text-center text-gray-300 text-sm">{user.bio}</p>
     
      <div className="flex justify-between pt-2">
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg" onClick={()=>handleClick("rejected",req)}>
            Reject
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg" onClick={()=>handleClick('accepted',req)}>
            Accept
          </button>
        </div>
      
  
  </div> }
    )}
    </div>
  )
}

export default RequestsReceived;