export const errorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "internal server error");
    err.statusCode || (err.statusCode = 500);
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
export const TryCatch = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((next) => {
    });
};
