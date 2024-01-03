const { query } = require('express');
const db = require('../models/db.js');
// uuid generates a unique and random 128 bit identifier for a session
const { v4: uuidv4 } = require('uuid');

const sessionController = {};

// can use this middleware to make sure users are authenticated if they want to access/modify personal data or submitting data
sessionController.isLoggedIn = async (req, res, next) => {
    // const userId = res.locals.userData.user_id;
    // TODO: fix error handling. invoke next with error OBJECT
    if(!req.cookies.ssid) {
        // return res.redirect('/signup');
        return res.status(401).json({ error: 'No session token was found' });
    }

    try {
        const queryText = 'SELECT * FROM sessions WHERE session_token = $1 AND expires_at > CURRENT_TIMESTAMP';
        const queryParams = [req.cookies.ssid];
        const { rows } = await db.query(queryText, queryParams);

        if (rows.length === 0) {
            return res.redirect('/signup');
        }

        // session is valid, store user_id in res.locals
        res.locals.userId = rows[0].user_id;
        // goes to next middleware
        return next();
    } catch(err) {
        return next({
            log: `ssessionController.isLoggedIn. ERROR: ${err}`,
            status: 500,
            message: { error: 'Error occured in sessionController.isLoggedIn. Check logs for more details'}
        });
    }
};

sessionController.startSession = async (req, res, next) => {
    const userId = res.locals.userData.user_id;
    console.log('sessionController.startSession - userId', userId);
    if (!userId) {
        return next(new Error('ERROR in sessionController.startSession: No user_id'));
    };

    // generate a unique session token with uuid
    const sessionToken = uuidv4();
    console.log('this is the sessionToken', sessionToken);
    // set expiration time for the session
    const expiresIn = new Date(Date.now() + 3600000) // milliseconds for one hour

    try {
        // check if there's an existing session for the user 
        let queryText = 'SELECT * FROM sessions WHERE user_id = $1';
        let queryParams = [userId];
        let { rows } = await db.query(queryText, queryParams);
        // check if rows length is greater than 0, this means that the user already has a session
        if (rows.length > 0) {
            console.log('user has a session')
            // update existing session
            // we could take out 'RETURNING session_id' as we're not using session_id for anything right now
            queryText = 'UPDATE sessions SET session_token = $1, expires_at = $2 WHERE user_id = $3 RETURNING session_id';
            queryParams = [sessionToken, expiresIn, userId];
        } else {
            console.log('user doesn\'t have a session'); 
            // create new session
            queryText = 'INSERT INTO sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3) RETURNING session_id';
            queryParams = [userId, sessionToken, expiresIn];
        }
        await db.query(queryText, queryParams);

        // store the session token in res.locals to be used by the cookieController
        res.locals.sessionToken = sessionToken;
        console.log('this is res.locals.sessionToken', res.locals.sessionToken);
        // store expiresIn time into res.locals to be used by cookieController
        res.locals.expiresIn = expiresIn;

        return next();
    } catch(err) {
        return next({
            log: `sessionController.startSession. ERROR: ${err}`,
            status: 500,
            message: { error: 'Error occured in sessionController.startSession. Check logs for more details'}
        });
    }
};

module.exports = sessionController;