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
import { INTERNAL_SERVER_ERROR } from './lib/constants/statusCode';
import { SOMETHING_BROKE } from './lib/constants/errorResponse';

const app = express();

// Connect to mongoDB
connectDB();

// Register Routes
app.use('/api', routers);

// Add error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(INTERNAL_SERVER_ERROR).json({SOMETHING_BROKE});
});

app.listen(PORT, () => {
    console.log(`Server running at port : ${PORT} in ${ENV} environment`);
});
