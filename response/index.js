module.exports = {
    success: (res, message, option = {}) =>{
        res.status(200).json({
            error:false,
            message:message,
           ...option
        }).end()
    },
    error : (res, message, option = {}) => {
        res.status(201).json({
            error:true,
            message:message,
            ...option
        }).end()
    }
}