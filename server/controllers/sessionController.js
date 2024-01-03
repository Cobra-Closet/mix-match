const { query } = require('express');
const db = require('../models/db.js');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
    // const userId = res.locals.userData.user_id;
    // TODO: fix error handling. invoke next with error OBJECT
    if(!req.cookies.ssid) {
        return res.redirect('/signup');
    }

    try {
        const quertyText = 'SELECT * FROM sessions WHERE session_token = $1 AND expires_at > CURRENT_TIMESTAMP';
        const queryParams = [req.cookies.ssid];
        const {rows } = await db.query(quertyText, queryParams);

        if (rows.length === 0) {
            return res.redirect('/signup');
        }

        // session is valid
        return next();
    } catch(err) {
        return next(err);
    }
    
    // const sessionId = await Session.find({ cookieId: res.cookies.ssid})

    // if(sessionId.length === 0) {
    //     return res.redirect('/signup');
    // }

    // return next();
};

sessionController.startSession = async (req, res, next) => {
    // if(res.locals.user_id === undefined) {
    //     return next('ERROR in sessionController.isLoggedIn: No user_id')
    // };

    
    // // example from notes
    // const checkForSession = await Session.findOne({cookieId: res.locals.user_id})
    // if(checkForSession) return next();

    // console.log('checkForSession!!!', checkForSession)
    // Session.create({cookieId: res.locals.user_id}), (err, sessionInfo) => {
    //     if(err) {
    //         return next('ERROR in sessionController.isLoggedIn' + err)
    //     } else {
    //         return next();
    //     }
    // }
    const userId = res.locals.userData.user_id;
    if (!userId) {
        return next(new Error('ERROR in sessionController.startSession: No user_id'));
    };

    
};

module.exports = sessionController;