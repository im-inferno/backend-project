import { asyncHandler } from "../utils/asyncHandler.js  ";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log("email :", email);
  res.status(200)
});

export { registerUser };
