import AppError from "../utils/appError.js";

const validate = (schema, source) =>{
    return (req, res, next) =>{
        const result = schema.safeParse(req[source]);
        if(!result.success){
            return next(new AppError(result.error.issues[0].message, 400));
        }
        req[source] = result.data;
        next();
    }
}

export default validate;