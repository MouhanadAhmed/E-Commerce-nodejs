import categoryRouter from "./modules/category/category.routes.js";
import AppError from './utils/services/AppError.js'
import { globalError } from "./utils/middleware/globalErrorHandle.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";
import brandRouter from "./modules/brand/brand.routes.js";
import productRouter from "./modules/product/product.routes.js";
import userRouter from "./modules/user/user.routes.js";

export default function init(app){

    app.use('/api/v1/category', categoryRouter);
    app.use('/api/v1/subCategory', subCategoryRouter);
    app.use('/api/v1/brand', brandRouter);
    app.use('/api/v1/product', productRouter);
    app.use('/api/v1/user', userRouter);
    
    
    
    // app.get('/', (req, res) => res.send('Hello World!'));
    app.all('*',(req,res,next)=>{
    next(new AppError(`can't find this route: ${req.originalUrl}`, 404))
})
app.use(globalError)
}