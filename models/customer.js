const mongoose = require('mongoose');
const driver = require('./driver').schema;

let Schema = mongoose.Schema;

let customer = new Schema({
    custId: Number,
    rides: [{
        rideId: Number,
        duration: Number,
        driverID: Number,
    }]
},{collection: 'customer'});

module.exports.schema = customer;