/**
 * File use to create payment schema and export payment model
 *
 * @file Payment.mjs
 * @author SachchidanandY
*/

import mongoose from 'mongoose';
import timeStampPlugin from '../helpers/timeStampPlugin';

const paymentSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    payment_history: { type: Array }
});

// Add time stamp plugin
paymentSchema.plugin(timeStampPlugin);

// Create PaymentHistory model
mongoose.model('payment_history', paymentSchema);

// Export PaymentHistory model
export default mongoose.model('payment_history');
