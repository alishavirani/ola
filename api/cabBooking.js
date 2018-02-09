const express = require('express');
const cab = require('./../controller/cab');
const redis = require('redis');

let client = redis.createClient();

const router = express.Router();

router.get('/', (req, res) => {
    res.render('cabBooking');
});

router.post('/', (req, res) => {
    console.log('Inside POST of API');
    let time = req.body.time;
    console.log('time ', time);
    let duration = Number(time);
    // console.log('typeof duration ', typeof duration);
    let timeInSec = time * 60;
    let timeInMs = timeInSec * 1000;
    let randomRideNo = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    let custRandNo = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    let counter = 0;

    let query = {
        status:false
    }

    cab.getDrivers(query, (err, result) => {
        if (err) {
            console.log('Error in fetching docs in API', err);
            return;
        }
        console.log('Docs in API', result);

        for (let i = 0; i < result.length; i++) {
            for (let item in result[i]) {
            //    if (result[i].status == false) {

                    let queryObj = {
                        driverID: result[i].driverID,
                        status: false
                    };

                    let rides = {
                        rideId: randomRideNo,
                        duration: timeInSec,
                        driverID: queryObj.driverID
                    }

                    let updateObj = {
                        status: true,
                        rides: []
                    }
                    updateObj.rides.push(rides);

                    let insertObj = {
                        custId: custRandNo,
                        rides: []
                    };
                    insertObj.rides.push(rides);

                    //call to controller
                    cab.updateDriver(queryObj, updateObj, (err, result) => {
                        if (err) {
                            console.log('Printing error in API', err);
                            return;
                        }
                        if (!result) {
                            console.log('No result obtained in API');
                            return;
                        }
                        console.log('SUCEESS IN API, Result obj->  ', result);
                        // alert('Booking successful');
                    });

                    cab.addCustomer(insertObj, (err, result) => {
                        if (err) {
                            console.log('Error in API Cust-->', err);
                            return;
                        }
                        if (!result) {
                            console.log('No result obtained in API Cust');
                            return;
                        }
                        console.log('SUCCESS IN API, Result obj Cust-->', result);
                    });

                    let successMsg = {
                        text: "Booking successful"
                    };
                    res.render('successful', successMsg);


                    let queryObj2 = {
                        driverID: 1,
                        status: true,
                    }

                    let newObj = {
                        status: false,
                    };

                    function myFunc() {
                        console.log('Inside myFunc');

                        cab.updateDriverTimeout(queryObj2, newObj, (err, result) => {
                            if (err) {
                                console.log('Error in API, in update driver', err);
                                return;
                            }
                            if (!result) {
                                console.log('No result obtained in API in update driver');
                                return;
                            }
                            console.log('SUCCESS IN API, Result obj in update driver->  ', result);
                        });


                        setTimeout(myFunc, timeInMs);
                    }

                
            }
        }
    });
});
module.exports = router;