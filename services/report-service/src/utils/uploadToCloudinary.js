import { Readable } from "node:stream";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "traceback-ai/reports",
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        );

        Readable.from(file.buffer).pipe(uploadStream);
    });
};

export default uploadToCloudinary;