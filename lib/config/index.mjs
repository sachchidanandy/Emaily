/**
 * Export configs
 * 
 * @file config.mjs
 * @author SachchidanandY
*/
import dotenv from 'dotenv';
import path from 'path';
import fileSystem from 'fs';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const ENV = process.env.ENV || 'Development';
export const GOOGLE_OAUTH_CALLBACK_URL = process.env.GOOGLE_OAUTH_CALLBACK_URL;
export const MONGO_URI = process.env.MONGO_URI;
export const SECRET = process.env.SECRET;
export const ENCRYPTION_ALGO = process.env.ENCRYPTION_ALGO;
export const PRIVATE_KEY = process.env.PRIVATE_KEY || fileSystem.readFileSync(path.resolve(process.cwd(), './lib/keys/.private_key.key'), 'utf8');
export const PUBLIC_KEY = process.env.PUBLIC_KEY ||  fileSystem.readFileSync(path.resolve(process.cwd(), './lib/keys/.public_key.key'), 'utf8');
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const STRIPE_SECRET = process.env.STRIPE_SECRET;
export const STRIPE_PUBLIC = process.env.STRIPE_PUBLIC;
export const SENDGRID_KEY = process.env.SENDGRID_KEY;
export const HOST_NAME = process.env.HOST_NAME;
