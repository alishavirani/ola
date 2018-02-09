const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let driverInit = new Schema({
    _driverId: mongoose.Schema.ObjectId,
    status: {
        type: Boolean,
        default:0
    }
},{collection: 'driverInit'});

module.exports.schema = driverInit;