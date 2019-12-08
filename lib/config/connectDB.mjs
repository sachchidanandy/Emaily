/**
 * File connect to the mongoDB
 *
 * @file connectDB.mjs
 * @author SachchidanandY
*/

import mongoose from 'mongoose';
import { MONGO_URI } from './';

// Connection config
const dbConfig = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}

export default () => {
    // Connect to db
    mongoose.connect(MONGO_URI, dbConfig).then(() => {
        console.log('Connected to db successfully.....');
    }).catch( err => {
        console.error(err.message);
    });

    // Listen to any error after connection
    mongoose.connection.on('error', err => {
        console.error(err.message);
    });
}
