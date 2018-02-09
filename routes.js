const home = require('./api/home');
const cab = require('./api/cabBooking');

module.exports.router = function(app) {
    app.use('/', home);
    app.use('/cabBooking', cab);
};