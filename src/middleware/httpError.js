export const httpError = (error,req, res, next) => {
    console.log(error)
    if (error.name.toLowerCase().includes("constrain")) {
        res.status(400).json({
            succes: false,
            message: "La solicitud contienen datos invalidos, por favor valide nuevamente."
        })  
    }

    res.status(500).json({
        succes: false,
        message: "Internal Server Error"
    })


}