import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { setuser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setisLogggedin } from "../utils/loginSlice";
import { useContext } from "react";
import AlertComponent from "./AlertComponent";
import { alertcontext } from "../Contexts/AlertContext";
const apiurl=import.meta.env.VITE_API_URL

function Login() {
  const {alert,showAlert}=useContext(alertcontext)
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const userdata = useSelector((store) => store.user.value);
  console.log("userdata", userdata);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!validator.isEmail(loginData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!loginData.password) {
      newErrors.password = "This field is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const data = await axios.post(
        `${apiurl}/auth/login`,
        loginData,
        { withCredentials: true }
      );
      console.log(data);
      dispatch(setisLogggedin(true))
      const res = await axios.get(`${apiurl}/profile`, {
        withCredentials: true,
      });
      showAlert({type:res?.data?.type,mesage:res?.data?.message})
    
      dispatch(setuser(res?.data?.user))

      console.log("submitted logged in");
      navigate('/')
    } catch (error) {
      console.log("error is", error.response?.data?.message);
      showAlert({type:'error',message:error.response?.data?.message})
    }
  };

  return (
    <>
    <div>
      {alert && <AlertComponent alert={alert}/>}
    </div>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-800 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-slate-900 text-white rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-slate-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-2">{errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-slate-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {errors.password && (
          <p className="text-red-400 text-sm mb-2">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
    </>
  );
}

export default Login;
