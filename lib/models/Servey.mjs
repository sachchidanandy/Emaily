/**
 * File use to create servey schema and export servey model
 *
 * @file Servey.mjs
 * @author SachchidanandY
*/

import mongoose, { Schema, model } from 'mongoose';
import timeStampPlugin from '../helpers/timeStampPlugin';
import recipientSchema from './Recipient';

const serveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    recipient_list: [recipientSchema],
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
});

// Add timestamp plugin
serveySchema.plugin(timeStampPlugin);

// Create model
mongoose.model('Servey', serveySchema);

export default mongoose.model('Servey');
