import express from 'express'
import { dbConnection } from './Database/dbConnection.js';
import { server } from './src/server.js';
import dotenv from 'dotenv';
import morgan from 'morgan';


dotenv.config();


const app = express()
const port = 3000
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('uploads'))
server(app)
dbConnection();
app.listen(port, () => console.log(`E-commerce app listening on port ${port}!`))

process.on('unhandledRejection', (err)=> console.log(err))