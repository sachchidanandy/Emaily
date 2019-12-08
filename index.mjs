/**
 * Root module use to run server and combine all modules
 * 
 * @file index.mjs
 * @author SachchidanandY
**/
import express from 'express';
import { ENV, PORT } from './lib/config';
import routers from './lib/routes';
import connectDB from './lib/config/connectDB';

const app = express();

// Connect to mongoDB
connectDB();

// Register Routes
routers(app);

app.listen(PORT, () => {
    console.log(`Server running at port : ${PORT} in ${ENV} environment`);
});
