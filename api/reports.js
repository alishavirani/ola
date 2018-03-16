const init = require('./../server/init');
const reports = require('./../controller/reports');

let router = init.express.Router();

router.get('/', (req, res) => {
    let driverArray =[];
    let customerArray =[];
    // res.render('report');
    console.log('Inside POST of GENERATE REPORT API');

    let getDrivers = new Promise((resolve, reject) => {
        reports.getDrivers(null, (err, drivers) => {
            if (err) {
                reject(console.log('GOT ERROR, DRIVERS REPORTS IN API => ', err));
            }
            if (!drivers) {
                reject(console.log('NO RESULT IN API, GET DRIVERS REPORTS'));
            }
            resolve(console.log('GOT DRIVERS REPORTS IN API => ', drivers));

            
            console.log('ISARRAY DRIVERARRAY??', Array.isArray(driverArray));
            for(let i = 0; i < drivers.length; i++) {
                 driver = {
                    driverID: drivers[i].driverID,
                    rideId: drivers[i].rides[0].rideId,
                    duration: drivers[i].rides[0].duration,
                    custId: drivers[i].rides[0].custId
                };
                driverArray.push(driver);
            }
            console.log('Driver Array => ', driverArray);
           
        });  
    });


    let getCustomers = new Promise((resolve, reject) => {
        reports.getCustomers(null, (err, customers) => {
            if (err) {
                reject(console.log('GOT ERROR, Customers REPORTS IN API => ', err));
            }
            if (!customers) {
                reject(console.log('NO RESULT IN API, GET Customers REPORTS'));
            }
            resolve(console.log('GOT Customers REPORTS IN API => ', customers));

           
            console.log('ISARRAY CUSTOMER ARRAY??', Array.isArray(customerArray));
            for(let i = 0; i < customers.length; i++) {
                 customer = {
                    custID: customers[i].custId,
                    rideId: customers[i].rides[0].rideId,
                    duration: customers[i].rides[0].duration,
                    driverID: customers[i].rides[0].driverID
                };
                customerArray.push(customer);
            }
            console.log('Customer Array => ', customerArray);
            
        });
    });

    Promise.all([getDrivers, getCustomers]).then((result) => {
        console.log('FULFILLED PROMISE => ', result);
        res.render('report', {showDrivers: driverArray, showCustomers: customerArray});
        // res.render('report', {showCustomers: customerArray});

    }, (reason) => {
        console.log('REJECTED PROMISE => ', reason);
        res.render('home');
    });

    
});

module.exports = router;