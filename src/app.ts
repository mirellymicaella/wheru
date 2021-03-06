import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import './database';
import { router } from './routes';
import { AppError } from './errors/AppError';
import { createConnection } from 'typeorm';


createConnection();

const app = express();
app.use(express.json());
//app.use(process.env.API_PREFIX,router);
app.use("/api/v1",router);

app.use((err: Error, request: Request, response: Response,_next: NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
          });
    }

    return response.status(500).json({
        status: 500,
        message:`Internal server error ${err.message}`,
    })
})


export { app };
