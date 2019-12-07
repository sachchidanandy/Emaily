/**
 * Combile all route file and expose them
 * 
 * @file index.mjs
 * @author SachchidanandY
*/
import authRoute from './auth';

export default (app) => {
    app.use('/auth', authRoute);
}
