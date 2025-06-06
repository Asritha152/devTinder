import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import { useSelector } from 'react-redux';
import { setuser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { alertcontext } from '../Contexts/AlertContext';
import { useContext } from 'react';
import AlertComponent from './AlertComponent';
const Editprofile = () => { 
  const dispacth=useDispatch()
  const {alert,showAlert}=useContext(alertcontext)
  const userdata = useSelector((store) => store.user.value);
  console.log(userdata);
  
  console.log("userdata", userdata);
    const [skillInput, setSkillInput] = useState('');
    const [editdata, seteditdata] = useState(userdata);
    const [errors, setErrors] = useState({});
    useEffect(() => {
      if (userdata) seteditdata(userdata);
    }, [userdata]);
    
  
    const handleChange = (field, value) => {
      seteditdata
      ((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  
    const validate = () => {
      const newErrors = {};
  
      if (!editdata.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
  
  
      if (!editdata.gender) {
        newErrors.gender = 'Please select your gender';
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
      try{
      console.log('Submitted Data:', editdata);
      const res=await axios.put('http://localhost:3000/profile/edit', editdata, {
        withCredentials: true
      });
      dispacth(setuser(editdata));
      console.log("edited data successfully");
      showAlert({type:res?.data?.type,message:res?.data?.message})
      
    
    }
    catch(err){
      console.log(err.message);
      showAlert({type:res?.data?.type,message:res?.data?.message})
      
    }
    
  
      
    };
  
    const handleSkillAdd = (e) => {
      if (e.key === 'Enter') {
        console.log("Entered");
        
        e.preventDefault();
        const trimmedSkill = skillInput.trim();
        console.log(editdata.skills);
        if (trimmedSkill && !editdata.skills.includes(trimmedSkill)) {
            console.log(editdata.skills);
            
          seteditdata((prev) => ({
            ...prev,
            skills: [...prev.skills, trimmedSkill],
          }));
        }
        setSkillInput('');
      }
    };
  
    const removeSkill = (index) => {
      seteditdata((prev) => ({
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index),
      }));
    };
  if (!editdata) {
    return <h1 className='mt-100px'>Loading...</h1>
    
  }
  

  return (
    <>
    <div>
    {alert && <AlertComponent alert={alert}/>}
    </div>
  <div className='w-full bg-gray-900 text-white h-screen flex justify-center items-center'>
    
  <div className="w-[50%] h-[75vh] m-auto flex items-center justify-center p-4">
    <ProfileCard user={editdata} isEdit={true}></ProfileCard>

    <div className='flex-1 h-full'>
      <form onSubmit={handleSubmit} className='w-full max-w-lg h-full p-6 bg-gray-800 border-l-2 border-l-blue-400 rounded-xl'>

        <div className='flex gap-4 mb-5'>
          <div className='w-1/2'>
            <input
              type='text'
              value={editdata.firstName}
              placeholder='First Name'
              className='w-full p-2 bg-gray-700 text-white outline-none rounded'
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            {errors.firstName && (
              <p className='text-red-400 text-sm mt-1'>{errors.firstName}</p>
            )}
          </div>

          <input
            type='text'
            value={editdata.lastName}
            placeholder='Last Name'
            className='w-1/2 p-2 bg-gray-700 text-white outline-none rounded'
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>

        <div className='flex gap-6 mb-3 text-white'>
          {['male', 'female', 'other'].map((g) => (
            <label key={g} className='flex items-center gap-2'>
              <input
                type='radio'
                name='gender'
                value={g}
                checked={g === editdata.gender}
                onChange={() => handleChange('gender', g)}
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className='text-red-400 text-sm mb-2'>{errors.gender}</p>
        )}

        <input
          type='text'
          placeholder='Enter a skill and press Enter'
          value={skillInput}
          className='w-full p-2 mb-2 bg-gray-700 text-white outline-none rounded'
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleSkillAdd}
        />

        <div className='h-[30%] overflow-y-auto'>
          <div className='flex flex-wrap gap-2 mb-2'>
            {editdata.skills.map((skill, index) => (
              <span
                key={index}
                className='bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm flex items-center'
              >
                {skill}
                <button
                  type='button'
                  className='ml-2 text-red-400 hover:text-red-600 font-bold'
                  onClick={() => removeSkill(index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <textarea
          placeholder='Bio'
          className='w-full p-2 mb-2 bg-gray-700 text-white outline-none rounded resize-none'
          rows={3}
          value={editdata.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
        />

        <input
          type='text'
          placeholder='Profile Photo URL'
          className='w-full p-2 mb-4 bg-gray-700 text-white outline-none rounded'
          value={editdata.profileURL}
          onChange={(e) => handleChange('profileURL', e.target.value)}
        />

        <button
          type='submit'
          className='w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded'
        >
          Update Profile
        </button>
      </form>
    </div>
  </div>
</div>
</>
  );
};

export default Editprofile;
