import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler.js  ";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiRes.js";

const registerUser = asyncHandler(async (req, res) => {
  //Get the data from the client
  const { fullname, username, email, password } = req.body;
  console.log("email :", email);
  res.status(200);
  //validation (whether the field is empty or not ....)
  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  //Checking whether the user with same username or email exits

  const userExits = User.findOne({ $or: [{ username }, { email }] });
  if (userExits) {
    throw new ApiError(408, "User with same user or email exits");
  }
  //Checking for images are present in the local storage
  const avatarImageLocalPath = req.files?.avata[0]?.path;
  const coverImageLocalPath = req.files?.avata[0]?.path;

  if (!avatarImageLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //Upload these images on cloudinary
  const avatar = await uploadOnCloudinary(avatarImageLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  //Create user object & create entry in DB

  const userCreated = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    username,
    email,
    password,
  });
  //Removed password and refreshToken field
  await User.findById(userCreated._id).select("-password -refreshToken");
  //Check whether user is registered or not
  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }
  //send reponse

  return res
    .status(201)
    .json(new ApiResponse(200, userCreated, "User Registered Successfully "));
});

export { registerUser };
