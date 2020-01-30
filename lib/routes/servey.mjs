/**
 * Module handles all routes related to servey
 *
 * @file servey.mjs
 * @author SachchidanandY
*/

import express from 'express';
import checkCredit from '../middleware/checkCredit'

const serveyRoutes = express.Router();

serveyRoutes.post('/create-servey', checkCredit, (req, res) => {
    // Validate input values

    // Create servey object

    // Send servey email to recipients

    // Save servey in database

    // Reduce one credit from credit

    // Update user details

    // Send success response
});

export default serveyRoutes;
