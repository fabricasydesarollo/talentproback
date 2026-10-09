export const httpError = (error, req, res, next) => {

    if (error.name?.toLowerCase().includes("constrain")) {
        return res.status(400).json({
            success: false,
            message: "La solicitud contiene datos inválidos."
        });
    }

    return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
};