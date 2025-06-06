import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import Editprofile from './components/Editprofile';
import Feed from './components/Feed';
import Myconnections from './components/Myconnections';
import RequestsReceived from './components/RequestsReceived';

import { setuser } from './utils/userSlice';
import { setisLogggedin } from './utils/loginSlice';
import { apiurl } from './utils/constants'; // Make sure this is defined as `export const apiurl = import.meta.env.VITE_API_URL`

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 👈 Add loading state

  useEffect(() => {
    async function getdata() {
      try {
        console.log("API URL in App.jsx:", apiurl); // ✅ Debug
        const res = await axios.get(`${apiurl}/profile`, {
          withCredentials: true,
        });
        dispatch(setuser(res?.data?.user));
        dispatch(setisLogggedin(true));
        navigate('/'); // ✅ Redirect to home only if login is valid
      } catch (error) {
        console.log("Error fetching profile:", error.message);
        navigate('/login'); // ✅ Redirect to login if not authenticated
      } finally {
        setLoading(false); // ✅ Done loading
      }
    }
    getdata();
  }, []);

  if (loading) return <div>Loading...</div>; // 👈 Optional UI

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={<Editprofile />} />
        <Route path="/connections" element={<Myconnections />} />
        <Route path="/requestsreceived" element={<RequestsReceived />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* fallback */}
      </Routes>
    </>
  );
}

export default App;
