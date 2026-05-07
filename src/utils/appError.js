export default class AppError extends Error {
    constructor(message, status) {
        super(JSON.stringify(message));
        this.status = status;
        this.isOperational = true;
    }
}
