// client/src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import Register from './components/Register';
import {Routes,Route, useNavigate}  from 'react-router-dom'
import Login from './components/Login';
import Nav from './components/Nav';
import Editprofile from './components/Editprofile';
import { useDispatch, useSelector } from 'react-redux';
import { setuser } from './utils/userSlice';
import { setisLogggedin } from './utils/loginSlice';
import axios from 'axios'
import Feed from './components/Feed';
import Myconnections from './components/Myconnections';
import RequestsReceived from './components/RequestsReceived';
function App() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    async function getdata(params) {
      try {
        const res = await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        });
        console.log(res?.data?.user);
        dispatch(setuser(res?.data?.user))
        dispatch(setisLogggedin(true))
        navigate('/')
        
      } catch (error) {
          console.log(error.message);
           navigate('/login')
      }
    }
    getdata();
    
  },[])
  return (<>
  <Nav></Nav>
    <Routes>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/' element={<Feed></Feed>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/edit' element={<Editprofile></Editprofile>}></Route>
      <Route path='/connections' element={<Myconnections></Myconnections>}></Route>
      <Route path='/requestsreceived' element={<RequestsReceived></RequestsReceived>}></Route>
    </Routes>

  </>)
}

export default App;