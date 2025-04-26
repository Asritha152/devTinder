import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setisLogggedin } from '../utils/loginSlice';
function Nav() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isLoggedin=useSelector(store=>store.login.value)
  const [isOpen,setisOpen]=useState(false)
  const user=useSelector(store=>store.user.value)
  console.log("user from nav",(user));
  
  const handleClick=async ()=>{
    try {
      await axios.get('http://localhost:3000/auth/logout',{
        withCredentials:true
      });
      dispatch(setisLogggedin(false))
      navigate('/login');
      
    } catch (error) {
      console.log(error.message); 
    }
  }

  return (
    <div className='w-full flex justify-between bg-black py-2 px-3 fixed top-0 items-center shadow-xl'>
      <div className='font-bold font-sans bg-gray-900 p-1 rounded-md text-4xl text-white'>
        <span className='text-yellow-400'>Dev</span>Tinder
      </div>

      {isLoggedin && <div className='flex gap-12 items-center relative'>
        <div className='text-white'>
          <button className='bg-gray-800 text-white w-48 py-1 px-4 rounded-md' onClick={()=>setisOpen(!isOpen)}>Menu</button>
          {
            isOpen && (<div
              className="bg-gray-900 absolute  flex flex-col text-white border-none px-2 outline-none py-1 rounded-md">
              <Link to="/" className='block px-4 py-2 text-white hover:bg-gray-700' >Home</Link>
              <Link  to="/connections"  className='block px-4 py-2 text-white hover:bg-gray-700'>View Connections</Link>
              <Link className='block px-4 py-2 text-white hover:bg-gray-700' to='/requestsreceived'>Connection Requests</Link>
              <Link to="/edit" className='block px-4 py-2 text-white hover:bg-gray-700'>Edit Profile</Link>
              <button className='text-white bg-red-600 p-2 rounded-md' onClick={handleClick}>Logout</button>
            </div>)
          }
          
        </div>
       

        <div className='w-[70px] h-[70px] ml-8 rounded-full overflow-hidden '>
          <img src={`${user?.profileURL}`} alt="" className='w-full h-full object-cover' />
        </div>

        
      </div>}
    </div>
  );
}

export default Nav;
