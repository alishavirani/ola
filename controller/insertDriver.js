const db = require('./../helpers/dbWrapper');
const driver = require('./../models/driver').schema;

module.exports.addDriver = (driverData, callback) => {
   
    //console.log('printing driverData in CONTROLLER--', driverData);

 
    db.set(driver, driverData, (err, driver) => {
        if(err) {
            console.log('Error in CONTROLLER--> ',err);
            callback(err, null);
            return;
        }
        console.log('Inside driver controller, printing driver info-->', driver);
        callback(null, driver);
        return;
    })
}
