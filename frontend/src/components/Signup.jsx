import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "../components/SignUp.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleLogin } from '@react-oauth/google';


function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate=useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios.post("http://localhost:4001/user/Signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Successfully SignedUp!!");
          navigate("/",{replace:true})
        }
        localStorage.setItem("User", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          toast.error("An error occurred");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-2xl">Sign Up</h3>
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <span className="text-xl">✕</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label 
              htmlFor="fullname" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your full name"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && (
              <p className="mt-1 text-sm text-red-500">This field is required</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="mt-1 text-sm text-red-500">This field is required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="mt-1 text-sm text-red-500">Invalid email address</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your password"
              {...register("password", { 
                required: true,
                
              })}
            />
            {errors.password?.type === "required" && (
              <p className="mt-1 text-sm text-red-500">This field is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="mt-1 text-sm text-red-500">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
            <p className="text-sm text-center sm:text-right">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-pink-500 hover:text-pink-700 font-medium"
              >
                Login
              </Link>
            </p>
            
            

            
          </div>
          <div className="flex flex-col justify-center ">
            <div className="text-gray-700 text-center">OR</div>
            <Link 
            to="/google" 
            className="text-center m-4 border border-black rounded-md p-2 hover:bg-gray-50 cursor-pointer">
              SignUp with google  < FontAwesomeIcon icon={faGoogle} className='ml-2' /></Link>
            
           
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;