/**
 * This is Global Error handler MiddleWare
 * @param {*} err the error from any controller or route
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */


export const globalError = (err,req,res,next)=>{
    let error =err.message;
    let code = err.statusCode || 500;
    process.env.MODE === 'dev' ? res.status(code).json({error, stack:err.stack}): res.status(code).json({error});
}