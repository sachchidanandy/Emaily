/**
 * File use to create Recipient schema and export Recipient schema
 *
 * @file Recipient.mjs
 * @author SachchidanandY
*/

import mongoose from 'mongoose';
import timeStampPlugin from '../helpers/timeStampPlugin';

const recipientSchema = new mongoose.Schema({
    email: { type: String },
    recieved_feedback: { type: Boolean, default: false },
    rating: { type: Number, default: 0 }
});

// Add time stamp plugin
recipientSchema.plugin(timeStampPlugin);

export default recipientSchema;
