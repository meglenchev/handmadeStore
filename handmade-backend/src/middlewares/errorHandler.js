export function errorHandler(err, req, res, next) {
    console.error(err);

    if (err.name === "ValidationError") {
        const firstError = Object.values(err.errors)[0];
        return res.status(400).json({ message: firstError.message });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            message:
                field === "email"
                    ? "User with the same email or username already exists!"
                    : "The field is already taken!",
        });
    }

    res.status(err.statusCode || 500).json({
        message: err.statusCode ? err.message : "A server error occurred.",
    });
}
