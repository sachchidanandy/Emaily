/**
 * Payment controller contail all payment related actions
 *
 * @file paymentController.mjs
 * @author SachchidanandY
*/

import Stripe from 'stripe';
import { SUCCESS, BAD_REQUEST, PAYMENT_REQ } from '../constants/statusCode';
import { PAYMENT_TOKEN_MISSING, CARD_DETAIL_MISSING, AMOUNT_MISSING, GET_STRIPE_ERROR } from '../constants/errorResponse';
import { STRIPE_SECRET } from '../config';
import PaymentHistory from '../models/Payment';

const stripeObject = new Stripe(STRIPE_SECRET);

export const addCredits = async (req, res) => {
    const reqBody = Object.assign({}, req.body);
    let updatedUserObj = {};

    // Get payment token from request
    const paymentToken = reqBody.hasOwnProperty('id') ? reqBody.id : false;
    if (!paymentToken) {
        return res.status(BAD_REQUEST).json(PAYMENT_TOKEN_MISSING);
    }

    // Get card details for future use
    const cardDetail = reqBody.hasOwnProperty('card') ? reqBody.card : false;
    if (!cardDetail) {
        return res.status(BAD_REQUEST).json(CARD_DETAIL_MISSING);
    }

    let amount = reqBody.hasOwnProperty('amount') ? Number(reqBody['amount']) : false;
    if (!amount) {
        return res.status(BAD_REQUEST).json(AMOUNT_MISSING);
    }

    try {
        // Create stripe charge object
        const charge = await stripeObject.charges.create({
            amount,
            currency: 'inr',
            source: paymentToken,
            description: `Payed Rs.${amount/100} for ${amount/100} credits.`
        });

        // Get amount from charge object
        amount = Number(charge['amount']);

        // Update credit for user
        req.user['credits'] = req.user['credits'] + amount / 100;
        updatedUserObj = await req.user.save();

        // Save payment history
        await PaymentHistory.findOneAndUpdate({
            user_id: updatedUserObj.id
        },{
            $push: { payment_history: [charge] }
        }, {upsert: true});
    } catch (error) {
        let errorResponse = GET_STRIPE_ERROR(error);
        console.log(error);
        if (errorResponse['code'] !== 3009) {
            errorResponse['message'] = 'Sorry, Payment Failed !'
        }
        return res.status(PAYMENT_REQ).json(errorResponse);
    }
    // Create user object
    const {display_name, email, first_name, last_name, awatar, credits} = updatedUserObj;

    //Send back user info
    res.status(SUCCESS).json({display_name, email, first_name, last_name, awatar, credits});
};
