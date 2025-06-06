import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [skillInput, setSkillInput] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    skills: [],
    bio: '',
    profileURL: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!registerData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!validator.isEmail(registerData.email)) newErrors.email = 'Enter a valid email';
    if (!validator.isStrongPassword(registerData.password, {
      minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,
    })) {
      newErrors.password = 'Password must include uppercase, lowercase, number & special char';
    }
    if (!registerData.gender) newErrors.gender = 'Select gender';
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
    setServerError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:3000/auth/register', registerData);
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (trimmed && !registerData.skills.includes(trimmed)) {
        setRegisterData((prev) => ({
          ...prev,
          skills: [...prev.skills, trimmed],
        }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setRegisterData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-950 text-white px-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-xl bg-gray-900 p-8 rounded-2xl shadow-lg space-y-5'
      >
        <h2 className='text-3xl font-semibold text-center text-white'>Create an Account</h2>

        {serverError && <p className='text-red-500 text-center'>{serverError}</p>}

        <div className='flex gap-4'>
          <div className='w-1/2'>
            <input
              type='text'
              placeholder='First Name'
              className='w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none'
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            {errors.firstName && <p className='text-red-400 text-sm mt-1'>{errors.firstName}</p>}
          </div>
          <input
            type='text'
            placeholder='Last Name'
            className='w-1/2 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none'
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>

        <input
          type='email'
          placeholder='Email'
          className='w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none'
          onChange={(e) => handleChange('email', e.target.value)}
        />
        {errors.email && <p className='text-red-400 text-sm'>{errors.email}</p>}

        <input
          type='password'
          placeholder='Password'
          className='w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none'
          onChange={(e) => handleChange('password', e.target.value)}
        />
        {errors.password && <p className='text-red-400 text-sm'>{errors.password}</p>}

        <div className='flex items-center gap-6'>
          {['male', 'female', 'other'].map((g) => (
            <label key={g} className='flex items-center gap-2'>
              <input
                type='radio'
                name='gender'
                value={g}
                onChange={() => handleChange('gender', g)}
              />
              <span className='capitalize'>{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className='text-red-400 text-sm'>{errors.gender}</p>}


        

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 disabled:opacity-50'
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className='text-center text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-400 hover:underline'>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
