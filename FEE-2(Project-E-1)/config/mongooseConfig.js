const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

module.exports = mongoose.connect(`${config.get('MONGODB_URL')}/movie-booking`).then(() => {
    dbgr('Connected to MongoDB...');
}).catch(err => {
    dbgr(err);
});