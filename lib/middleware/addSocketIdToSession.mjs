/**
 * Middleware to add socket id to the session
 *
 * @file addSocketIdToRequest.js
 * @author SachchidanandY
*/

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to 
// the right socket
export default (req, res, next) => {
    req.session.socketId = req.query.socketId;
    next();
};
