const db = require('../models/db.js');
// node-cron is a task scheduling library for node.js - can schedule and automate tasks at specific intervals or times
// cron time syntax is a little confusing even after looking at docs
const cron = require('node-cron');

const sessionCleanupController = {};

sessionCleanupController.startCleanup = () => {
  // 0**** = cron time syntax for hourly. 
  // 0 = run a the 0th minute, * = run every hour, * = run everyday of the month, * = run every month, * = run everyday of the week
  cron.schedule('0 * * * *', async () => {
    try {
      const queryText = 'DELETE FROM sessions WHERE expires_at < CURRENT_TIMESTAMP;';
      await db.query(queryText);
      console.log('Expired sessions deleted successfully');
    } catch (err) {
      console.error('Error deleting expired sessions:', err);
    }
  });
};

module.exports = sessionCleanupController;