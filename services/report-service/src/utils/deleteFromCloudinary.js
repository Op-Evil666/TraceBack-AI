import cloudinary from "../config/cloudinary.js";

const deleteFromCloudinary = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId, {
        resource_type: "image"
    });
};

export default deleteFromCloudinary;