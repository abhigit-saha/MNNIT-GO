// components/Login.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import "../components/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for handling cookies
        body: JSON.stringify({
          // Send either username or email based on input format
          [data.identifier.includes("@") ? "email" : "username"]:
            data.identifier,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // The backend now handles cookies, so we don't need to store tokens
        // We can still store user data if needed
        if (responseData.data?.user) {
          localStorage.setItem("User", JSON.stringify(responseData.data.user));
        }
        toast.success(responseData.message || "Successfully logged in");
        navigate("/dashboard", { replace: true });
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
                  type="text"
                  placeholder="Email Address or Username"
                  {...register("identifier", {
                    required: "Email or username is required",
                  })}
                />
                {errors.identifier && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.identifier.message}
                  </p>
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="pass-link">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              {/* <div className="flex flex-col justify-center">
                <div className="text-gray-700 text-center m-4">OR</div>
                <Link
                  to="/google"
                  className="text-center m-4 border border-black rounded-md p-2 hover:bg-gray-50 cursor-pointer"
                >
                  Login with Google{" "}
                  <FontAwesomeIcon icon={faGoogle} className="ml-2" />
                </Link>
              </div> */}
              <div className="signup-link">
                Not a member? <Link to="/signup">Signup now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
