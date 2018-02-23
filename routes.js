const home = require('./api/home');
const cab = require('./api/cabBooking');
const reports = require('./api/reports');

module.exports.router = function(app) {
    app.use('/', home);
    app.use('/cabBooking', cab);
    app.use('/reports', reports);
};