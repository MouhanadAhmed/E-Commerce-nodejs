
/**
 * *This is Async Error Handler MiddleWare 
 */
export const catchAsyncError =(fn) =>{
    return async (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            // res.json(err);
            next(err);
        })
    }
}