export function notFound(req, res, next) {
    res.status(404).json({ message: "Error 404: Route not found" });
}

export function errorHandler(error, req, res, next) {
    // for development
    console.error(error.stack);
    // for production
    // console.error(error.message);
    res.status(500).json({ message: "Error 500: Internal Server Error" });
}
