const mongoose = require('mongoose');

// const customer = require('./customer');

let Schema = mongoose.Schema;

let driver = new Schema({
    driverID: Number,
    status: {
        type: Boolean,
        default: false
    },
    rides: [{
        rideId: Number,
        duration: Number,
        custId: Number
    }]
}, {collection: 'driver'});

module.exports.schema = driver;
