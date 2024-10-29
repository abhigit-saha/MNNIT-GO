import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import "../components/Login.css"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:4001/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        toast.success("Successfully logged in");
        localStorage.setItem("User", JSON.stringify(responseData.user));
      } else {
        toast.error(responseData.message || "An error occurred");
      }
    } catch (err) {
      toast.error("Connection error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
    <div className="wrapper">
      <div className="title-text">
        <div className="title login">Login Form</div>
      </div>
      
      <div className="form-container">
        <div className="form-inner">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <div className="pass-link">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" />
            </div>
            
            <div className="signup-link">
              Not a member? <Link to="/Sign Up">Signup now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;