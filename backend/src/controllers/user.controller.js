// Import necessary modules

// Sign-up controller
// export const Signup = async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const hashPassword = await bcryptjs.hash(password, 10);
//     const createdUser = new User({
//       fullname: fullname,
//       email: email,
//       password: hashPassword,
//     });
//     await createdUser.save();
//     res.status(201).json({
//       message: "User created successfully",
//       user: {
//         _id: createdUser.id,
//         fullname: createdUser.fullname,
//         email: createdUser.email,
//       },
//     });
//   } catch (error) {
//     console.log("Error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Login controller with JWT generation
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcryptjs.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT with user ID
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       message: "Login Successful",
//       user: {
//         _id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//       },
//       token, // Send token to client
//     });
//   } catch (error) {
//     console.log("Error:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/APIResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("user there", user);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); //since this user instance doesnt
    //have a password whenever we save it mongoose would require existance of the password
    //hence to avoid it we do validatebefore save as false.
    console.log(accessToken);
    console.log(refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  //console.log("email: ", email);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const user = await User.create({
    fullname,
    email,
    password,
    username,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError("Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, username, password } = req.body;
  console.log(email);

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  // Here is an alternative of above code based on logic discussed in video:
  // if (!(username || email)) {
  //     throw new ApiError(400, "username or email is required")

  // }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true, // only http requests from the server can modify them
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, newRefreshToken },
        "Access Token Refreshed"
      )
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  if (oldPassword === newPassword) {
    throw new ApiError(400, "Old and new password cannot be the same");
  }
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({
    email,
  });
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Email and password combination is wrong");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { password: hashedPassword });

  return res.status(200).json(new ApiResponse(200, {}, "Password Updated"));
});
export {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  refreshAccessToken,
};

// Middleware to authenticate JWT
export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from header
  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Protected route for user dashboard
export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
