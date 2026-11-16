import { loginService } from "../services/authService.js";

const loginUser = async (req, res) =>{
    const accessToken = await loginService(req.body, res);
    return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken
    });
}

export default loginUser;