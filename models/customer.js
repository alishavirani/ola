const mongoose = require('mongoose');
const driver = require('./driver').schema;

let Schema = mongoose.Schema;

let customer = new Schema({
    custId: {
        type: Number,
        ref: 'driver.rides'
    },
    rides: [{
        rideId: {
            type: Number,
            ref: 'driver.rides'
        },
        duration: Number,
        driverID: {
            type: Number,
            ref: 'driver'
        }
    }]
},{collection: 'customer'});

module.exports.schema = customer;