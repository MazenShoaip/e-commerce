import AppError from "../utils/appError.js";

export default function notFound(req, res, next) {
    next(new AppError("Route was not found", 404));
}
