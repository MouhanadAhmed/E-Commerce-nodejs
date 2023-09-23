import categoryRouter from "./modules/category/category.routes.js";
import {AppError} from './utils/AppError.js'
import { globalError } from "./middleware/GlobalErrorHandler.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";
import brandRouter from "./modules/brand/brand.routes.js";
import productRouter from "./modules/product/product.routes.js";

export function server(app){

    app.use('/api/v1/category', categoryRouter);
    app.use('/api/v1/subCategory', subCategoryRouter);
    app.use('/api/v1/brand', brandRouter);
    app.use('/api/v1/product', productRouter);
    app.get('/', (req, res) => res.send('Hello World!'));
    app.all('*',(req,res,next)=>{
    next(new AppError("Not Found", 404))
})
app.use(globalError)
}