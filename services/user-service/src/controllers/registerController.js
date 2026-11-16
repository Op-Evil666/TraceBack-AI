import { registerService } from "../services/authService.js";

const registerUser = async (req, res) => {
  const user = await registerService(req.body);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    userId: user._id.toString(),
  });
};

export default registerUser;