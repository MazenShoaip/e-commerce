export default function errorsHandle(err, req, res, next) {
    console.log("This error handler");
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}
