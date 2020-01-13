/**
 * Root module use to run server and combine all modules
 * 
 * @file index.mjs
 * @author SachchidanandY
**/
import express from 'express';
import http from 'http';
import { ENV, PORT, SESSION_SECRET } from './lib/config';
import routers from './lib/routes';
import connectDB from './lib/config/connectDB';
import { INTERNAL_SERVER_ERROR } from './lib/constants/statusCode';
import { SOMETHING_BROKE } from './lib/constants/errorResponse';
import socketio from 'socket.io';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express();

// Connect to mongoDB
connectDB();

// Create httpServer
const httpServer = http.createServer(app);

// Connecting sockets to the server and adding them to the request
// so that we can access them later in the controller
const io = socketio(httpServer)
app.set('io', io)

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Add body parser middleware
app.use(bodyParser.json());

// Register Routes
app.use('/api',routers);

// Add error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(INTERNAL_SERVER_ERROR).json({SOMETHING_BROKE});
});

httpServer.listen(PORT, () => {
    console.log(`Server running at port : ${PORT} in ${ENV} environment`);
});
