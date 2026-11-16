import verifyUserService from "../services/verifyUserService.js";

const verifyUser = async (req, res) => {
    const { otp } = req.body;
    const { id } = req.params;

    const result = await verifyUserService({ id, otp });

    return res.status(200).json(result);
};

export default verifyUser;