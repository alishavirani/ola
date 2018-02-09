const driver = require('./../models/driver').schema;
const customer = require('./../models/customer').schema;
const db = require('./../helpers/dbWrapper');

module.exports.updateDriver = (queryObj, updateObj, callback) => {
    console.log('Inside controller updateDriver');
    db.put(driver, queryObj, updateObj, (err, driver) => {
        if(err) {
            console.log('Error in CONTROLLER', err);
            callback(err, null);
            return;
        }
        console.log('Got driver in controller--', driver);
        callback(null, driver);
        return;
    });
};

module.exports.updateDriverTimeout = (updateObj, newObj, callback) => {
    console.log('updateObj in CONTROLLER', updateObj);
    console.log('newObj in CONTROLLER', newObj);
    
    db.put(driver, updateObj, newObj, (err, driver) => {
        console.log('Obtaining results from dbWrapper', driver);
        if(err) {
            console.log('Error in CONTROLLER timeout', err);
            callback(err, null);
            return;
        }
        console.log('Got driver in controller timeout--', driver);
        callback(null, driver);
        return;
    });
}

module.exports.addCustomer = (insertObj, callback) => {
    console.log('Inside controller addCust');

    db.set(customer, insertObj, (err, customer) => {
        if(err) {
            console.log('Error in CONTROLLR addCust', err);
            callback(err, null);
            return;
        }
        console.log('Got customer in controller', customer);
        callback(null, customer);
        return;
    });
};

module.exports.getDrivers = (queryObj, callback) => {
    console.log('Inside controller getAll');
    db.getAll(driver, queryObj, null, null, (err, drivers) => {
        if(err) {
            console.log('Error in fetching drivers in CONTROLLER', err);
            callback(err, null);
            return;
        }
        console.log('Driver docs in CONTROLLER', drivers);
        callback(null, drivers);
        return;
    });
};