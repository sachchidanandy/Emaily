/**
 * File use to create user schema and export user model
 *
 * @file User.mjs
 * @author SachchidanandY
*/

import mongoose, { Schema } from 'mongoose';
import timeStampPlugin from '../helpers/timeStampPlugin';

const userSchema = new Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    awatar: { type: String }
});

// Add time stamp plugin
userSchema.plugin(timeStampPlugin);

// Create user model
export default mongoose.model('User', userSchema);
