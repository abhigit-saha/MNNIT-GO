import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },          
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for handling cookies
        body: JSON.stringify({
          fullname: data.fullname,
          email: data.email,
          password: data.password,
          username: data.username, // Add username field
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.data?.user) {
          localStorage.setItem("User", JSON.stringify(responseData.data.user));
        }
        toast.success(responseData.message || "Successfully Signed Up!");
        navigate("/", { replace: true });
      } else {
        toast.error(responseData.message || "An error occurred");
      }
    } catch (err) {
      toast.error("Connection error. Please try again.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (credentialResponse.credential) {
      await axios
        .post("http://localhost:8000/user/google-signin", {
          token: credentialResponse.credential,
        })
        .then((res) => {
          toast.success("Successfully signed in with Google!");
          localStorage.setItem("User", JSON.stringify(res.data.user));
          navigate("/", { replace: true });
        })
        .catch((err) => {
          toast.error("Google sign-in failed.");
        });
    }
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
              <p className="mt-1 text-sm text-red-500">
                This field is required
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Choose a username"
              {...register("username", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers and underscores",
                },
              })}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message || "Username is required"}
              </p>
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
              <p className="mt-1 text-sm text-red-500">
                This field is required
              </p>
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
                minLength: 6,
                // pattern: {
                //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                //   message:
                //     "Password must contain at least one letter and one number",
                // },
              })}
            />
            {errors.password?.type === "required" && (
              <p className="mt-1 text-sm text-red-500">
                This field is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="mt-1 text-sm text-red-500">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>

          <div className="flex justify-center pt-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google sign-in error")}
            />
          </div>

          <p className="text-sm text-center sm:text-right mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-500 hover:text-pink-700 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
