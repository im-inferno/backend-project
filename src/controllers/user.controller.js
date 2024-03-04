import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js  ";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiRes.js";

const registerUser = asyncHandler(async (req, res) => {


  //Get the data from the client

  const { fullName, userName, email, password } = req.body;
  res.status(200);


  //validation (whether the field is empty or not ....)

  if (
    [fullName, userName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }


  //Checking whether the user with same username or email exits

  const userExits = await User.findOne({ $or: [{ userName }, { email }] });
  if (userExits) {
    throw new ApiError(408, "User with same user or email exits");
  }


  //Checking for images are present in the local storage

  const avatarImageLocalPath = req.files?.avatar[0]?.path;

  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
  }

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
    fullName,
    userName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
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
