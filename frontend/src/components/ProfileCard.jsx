import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setFeed } from '../utils/FeedSlice';
import { useContext } from 'react';
import { alertcontext } from '../Contexts/AlertContext';
import AlertComponent from './AlertComponent';
function ProfileCard({user,isEdit}) {
  const {showAlert,alert}=useContext(alertcontext);
  const dispatch=useDispatch();
  let feed=useSelector(store=>store.feed.value)
  const handleClick=async (status)=>{
    try{
      const res=await axios.post(`http://localhost:3000/request/send/${status}/${user._id}`,{},{
        withCredentials:true
      })
      console.log(`http://localhost:3000/request/send/${status}/${user._id}`);
      feed=feed.filter(u=>u._id!==user._id)
      dispatch(setFeed(feed))
      console.log(status+"request sent successfully");
      showAlert({type:res?.data?.type,message:res?.data?.message})
    }
    catch(error){
      console.log(error.message);
      showAlert({type:'error',message:error?.response?.message})
      
    }
    
    
  }

  return (
    <>
    <div>
      {alert && <AlertComponent alert={alert}></AlertComponent>}
    </div>
    <div className="w-[400px] max-w-md h-full bg-gray-800 p-6 space-y-4 rounded-xl">
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
   
    { !isEdit && (<div className="flex justify-between pt-2">
        <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg" onClick={()=>handleClick("ignored")}>
          Ignore
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg" onClick={()=>handleClick('interested')}>
          Interested
        </button>
      </div>
    )}

</div> 
</>
  )
}

export default ProfileCard