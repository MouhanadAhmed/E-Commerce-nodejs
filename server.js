import express, { urlencoded } from 'express'
import  dbConnection  from './Database/dbConnection.js';
import  init  from './src/index.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();


const app = express()
const port = 3000 
app.use(express.static("uploads"))           // Serving the static uploads
app.use(cors())                              // Enabling CORS globally on the server
app.use(express.json());                     //Enabling a built in middleware function in Express . It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.urlencoded({extended:true})) //Enabling a built-in middleware function in Express. It parses incoming requests with JSON payloads 
app.use(morgan('dev'));                      // Enabling a request logger
init(app)
dbConnection();
app.listen(process.env.PORT || port, () => console.log(`E-commerce app listening on port ${port}!`))

process.on('unhandledRejection', (err)=> console.log(err))