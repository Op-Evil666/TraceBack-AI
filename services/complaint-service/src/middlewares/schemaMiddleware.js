import AppError from "../utils/appError.js";

const validate = (schema, source) => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return next(
                new AppError(result.error.issues[0].message, 400)
            );
        }

        if (source === "query") {
            req.validatedQuery = result.data;
        } else if (source === "params") {
            req.validatedParams = result.data;
        } else {
            req.validatedBody = result.data;
        }

        next();
    };
};

export default validate;
