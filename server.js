import express, { urlencoded } from 'express'
import  dbConnection  from './Database/dbConnection.js';
import  init  from './src/index.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();


const app = express()
const port = 3000
app.use(express.static("uploads"))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use(express.static('uploads'))
init(app)
dbConnection();
app.listen(process.env.PORT || port, () => console.log(`E-commerce app listening on port ${port}!`))

process.on('unhandledRejection', (err)=> console.log(err))