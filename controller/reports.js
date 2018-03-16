const driver = require('./../models/driver').schema;
const customer = require('./../models/customer').schema;
const db = require('./../helpers/dbWrapper');

module.exports.getDrivers = (queryObj, callback) => {
    console.log('Inside controller getAll Driver');
    db.getAll(driver, queryObj, null, null, (err, drivers) => {
        if (err) {
            console.log('Error in fetching drivers in CONTROLLER', err);
            callback(err, null);
            return;
        }
        console.log('Driver docs in CONTROLLER', drivers);
        callback(null, drivers);
        return;
    });
};

module.exports.getCustomers = (queryObj, callback) => {
    console.log('Inside controller getAll Customer');
    db.getAll(customer, queryObj, null, null, (err, customers) => {
        if (err) {
            console.log('Error in fetching customers in CONTROLLER', err);
            callback(err, null);
            return;
        }
        console.log('customer docs in CONTROLLER', customers);
        callback(null, customers);
        return;
    });
};