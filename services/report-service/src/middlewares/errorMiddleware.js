const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    const statusCode =
    Number.isInteger(err.statusCode) &&
    err.statusCode >= 400 &&
    err.statusCode <= 599
        ? err.statusCode
        : 500;

    return res.status(statusCode).json({
        success: false,
        message: statusCode === 500 
        ? "Internal server error" 
        : err.message
    });
};

export default errorMiddleware;