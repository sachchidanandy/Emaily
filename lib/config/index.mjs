/**
 * Export configs
 * 
 * @file config.mjs
 * @author SachchidanandY
*/
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const ENV = process.env.ENV || 'Development';
export const GOOGLE_OAUTH_CALLBACK_URL = process.env.GOOGLE_OAUTH_CALLBACK_URL;
export const MONGO_URI = process.env.MONGO_URI;
