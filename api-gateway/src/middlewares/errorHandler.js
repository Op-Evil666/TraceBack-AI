const errorHandler = (err, req, res, next) => {

    // Log the error on the server
    console.error({
        message: err.message,
        method: req.method,
        path: req.originalUrl,
        stack: process.env.NODE_ENV === "development"
            ? err.stack
            : undefined
    });

    // Avoid attempting to send another response
    if (res.headersSent) {
        return next(err);
    }

    // Validate HTTP status code
    const statusCode =
        Number.isInteger(err.statusCode) &&
        err.statusCode >= 400 &&
        err.statusCode <= 599
            ? err.statusCode
            : 500;

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500
            ? "Internal server error."
            : err.message
    });
};

export default errorHandler;