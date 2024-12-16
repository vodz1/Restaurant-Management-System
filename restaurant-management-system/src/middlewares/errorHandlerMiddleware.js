
function errorHandler(err, req, res, next) {
    console.error(err);  // Log the full error for debugging
    
    if (err.name === 'ValidationError') {
        // Example: Handle validation errors
        return res.status(400).json({ 
            error: 'Validation Error',
            message: err.message,
            details: err.errors // Optional: Return validation details
        });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            error: 'Resource Not Found',
            message: err.message,
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: err.message,
        });
    }

    // Default error handler
    return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred. Please try again later.',
    });
}

module.exports = errorHandler;
