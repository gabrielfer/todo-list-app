const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err);

    const errorResponse = {
        message: err.message || "Internal server error",
        status: err.status || 500
    };

    if (err.name === "ValidationError") {
        errorResponse.status = 400;
        errorResponse.message = "Invalid input: " + err.details;
    }

    if (err.name === "MissingFieldsError") {
        errorResponse.status = 400;
        errorResponse.message = "Missing required fields: " + err.missingFields;
    }

    if (err.name === "DatabaseError") {
        errorResponse.status = 500;
        errorResponse.message = "Database operation failed: " + err.details;
    }

    if (err.name === "BadRequestError") {
        errorResponse.status = 400;
        errorResponse.message = "Bad request: " + err.details;
    }

    if (err.name === "NotFoundError") {
        errorResponse.status = 404;
        errorResponse.message = err.details || "Resource not found";
    }

    res.status(errorResponse.status).json(errorResponse);
};

export default errorHandler;
