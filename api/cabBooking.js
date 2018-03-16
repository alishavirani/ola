const init = require('./../server/init');
const cab = require('./../controller/cab');
// const app = require('./../server');
const router = init.express.Router();
// console.log('App =>', app);
// console.log('depInject => ', app.get(connections));
let durationArray = []; 



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
    durationArray.push(duration);

    let query = {
        status: false
    }

    cab.getDrivers(query, (err, result) => {
        if (err) {
            console.log('Error in fetching docs in API', err);
            return;
        }
        console.log('Docs in API, RESULT', result);
        console.log('result[0].==', result[0]);

        let queryObj = {
            driverID: result[0].driverID,
            status: false
        };

        let ridesUpd = {
            rideId: randomRideNo,
            duration: timeInSec,
            custId: custRandNo
        };

        let ridesIns = {
            rideId: randomRideNo,
            duration: timeInSec,
            driverID: result[0].driverID
        };

        let updateObj = {
            status: true,
            rides: []
        };
        updateObj.rides.push(ridesUpd);

        let insertObj = {
            custId: custRandNo,
            rides: []
        };
        insertObj.rides.push(ridesIns);

        let updateDriver = new Promise((resolve, reject) => {
            cab.updateDriver(queryObj, updateObj, (err, result) => {
                if (err) {
                    reject(console.log('Printing error in API', err));
                    return;
                }
                if (!result) {
                    reject(console.log('No result obtained in API'));
                    return;
                }
                resolve(console.log('SUCEESS IN API, Result obj->  ', result));
                return;
            });

        });

        let insCustomer = new Promise((resolve, reject) => {
            cab.addCustomer(insertObj, (err, result) => {
                if (err) {
                    reject(console.log('Error in API Cust-->', err));
                    return;
                }
                if (!result) {
                    reject(console.log('No result obtained in API Cust'));
                    return;
                }
                resolve(console.log('SUCCESS IN API, Result obj Cust-->', result));
                return;
            });
        });

        // let trueQuery = {
        //     status: true
        // };


        let tableObject = {
            driverID: result[0].driverID,
            rideId: randomRideNo,
            duration: duration,
            custId: custRandNo
        };

        let condition = new Promise((resolve, reject) => {
            let minDuration = {};

            cab.getDrivers(null, (err, result) => {
                console.log('Bringing results from controller--> ', result);
                if (err) {
                    console.log('Error in API getAvailableDrivers-->', err);
                    return;
                }
                if (!result) {
                    console.log('No result obtained in API getAvailableDrivers');
                    return;
                }
                console.log('DOCS in getAvaialbleDrivers--------> ', result);
                
                // for(let i = 0; i < result.length; i++) {
                                      
                //     for(let j = 0; j < durationArray.length; i++ ) {
                //         durationArray.push(result[i].rides[j].duration);
                //     }
                //     //console.log('DURATION ARRAY[i] => ', durationArray[i]);    
                // }
                console.log('DURATION ARRAY => ', durationArray);

                minDuration = {
                    time: durationArray[0]
                };

                console.log('MinDuration.time =>=>=> ', minDuration.time);
                console.log('MIN DURATION BEFORE LOOP => ', minDuration);

                for(let i = 0; i < durationArray.length; i++) {
                    if(minDuration.time > durationArray[i]) {
                        minDuration.time = durationArray[i];
                    }
                }
                console.log('MIN DURATION AFTER LOOP => ', minDuration.time);
                
                // result.forEach(function (rides) {
                //     for (let i = 0; i < rides.length; i++) {
                //         minDuration = rides[i].duration;
                //         if (rides[i].duration < minDuration) {
                //             minDuration = rides[i].minDuration;
                //         }
                //     }
                // });
             });

            console.log('Printing result array----', result);
            console.log('Printing result array length----', result.length);
            if (result.length <= 1 || !result) {
                console.log('Min Duration.time => ', minDuration.time);
                reject(res.render('options', minDuration));
                return;
            }
            resolve(res.render('successful', tableObject));
            return;
        });

        Promise.all([updateDriver, insCustomer, condition]).then((result) => {
            console.log('SUCCESS: ', result);
        }).catch((reason) => {
            console.log('FAILURE:', reason);
        });

        // let getAvailDrivers = new Promise((resolve, reject) => {
        //     console.log('Inside api of getAvailDrivers');
        //     let minDuration;
        //     cab.getDrivers(null, (err, result) => {
        //         console.log('Bringing results from controller--> ', result);
        //         if (err) {
        //             reject(console.log('Error in API getAvailableDrivers-->', err));
        //             return;
        //         }
        //         if (!result) {
        //             reject(console.log('No result obtained in API getAvailableDrivers'));
        //             return;
        //         }

        //         console.log('DOCS in getAvaialbleDrivers--------> ', result);
        //         result.forEach(function (rides) {
        //             for (let i = 0; i < rides.length; i++) {
        //                 minDuration = rides[i].duration;
        //                 if (rides[i].duration < minDuration) {
        //                     minDuration = rides[i].minDuration
        //                 }
        //             }
        //         });
        //         console.log('MIN DURATION =>', minDuration);
        //         resolve(res.render('options', {minDuration}));
        //         return;
        //     });
        // });

        // getAvailDrivers.then((result) => {
        //     console.log('PROMISE FULFILLED GET AVAIL DRIV, RESULT => ', result);       
        // }, (reason) => {
        //     console.log('PROMISE REJECTED IN GET AVAILABLE DRIVERS, REASON =>', reason);
        // });

        let newObj = {
            status: false,
        };

        let queryObj2 = {
            driverID: result[0].driverID,
            status: true,
        }

        let updateDriverTimeoutPromise = new Promise((resolve, reject) => {
            let updateDriverTimeout = setTimeout(() => {
                cab.updateDriverTimeout(queryObj2, newObj, (err, result) => {
                    if (err) {
                        reject('Error in API, in update driver', err);
                    }
                    if (!result) {
                        reject('No result obtained in API in update driver');
                    }
                    resolve('SUCCESS IN API, Result obj in update driver->  ', result);
                });
            }, timeInMs);
        });

        updateDriverTimeoutPromise.then((result) => {
            console.log('SUCCESS: Data updated after timeout, result=> ', result);
        }, (reason) => {
            console.log('FAILURE: Failure in updation after timeout, reason => ', reason);
        });

    });
});



// router.post('/', (req, res) => {
//     console.log('Inside POST of API');
//     let time = req.body.time;
//     console.log('time ', time);
//     let duration = Number(time);
//     // console.log('typeof duration ', typeof duration);
//     let timeInSec = time * 60;
//     let timeInMs = timeInSec * 1000;
//     let randomRideNo = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
//     let custRandNo = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
//     let driversArray;

//     let query = {
//         status: false
//     }

//     let getDrivers = new Promise((resolve, reject) => {
//         cab.getDrivers(query, (err, drivers) => {
//             if (err) {
//                 reject(console.log('ERROR in API GET DRIVERS => ', err));
//             }
//             if (!drivers) {
//                 reject(console.log('NO DRIVERS IN API GET DRIVERS'));
//             }

//             resolve(console.log('DRIVERS IN API => ', drivers));
//             console.log('DRIVERS"S LENGTH => ', drivers.length);
//            // driversArray = JSON.parse(JSON.stringify(drivers));
//             driversArray = drivers.slice(0);
//             console.log('DRIVERS ARRAY => ', driversArray);
//             console.log('TYPEOF DRIVERSARRAY => ', typeof driversArray);
//             console.log('ISARRAY DRIVERSARRAY?? => ', Array.isArray(driversArray));
//         });
//     }); 

//     let queryObj = {
//         driverID: driversArray[0].driverID,
//         status: false
//     };

//     let ridesUpd = {
//         rideId: randomRideNo,
//         duration: timeInSec,
//         custId: custRandNo
//     };

//     let updateObj = {
//         status: true,
//         rides: []
//     };
//      updateObj.rides.push(ridesUpd);

//     let updateDrivers = new Promise((resolve, reject) => {
//         cab.updateDriver(queryObj, updateObj, (err, updatedDriver) => {
//             if (err) {
//                 reject(console.log('ERROR in API UPDATE DRIVERS => ', err));
//             }
//             resolve(console.log('UPDATED DRIVERS, IN API => ', updatedDriver));
//         });
//     });

//     let ridesIns = {
//         rideId: randomRideNo,
//         duration: timeInSec,
//         driverID: driversArray[0].driverID
//     };

//     let insertObj = {
//         custId: custRandNo,
//         rides: []
//     };
//     insertObj.rides.push(ridesIns);

//     let insertCustomer = new Promise((resolve, reject) => {
//         cab.addCustomer(insertObj, (err, customer) => {
//             if (err) {
//                 reject(console.log('ERROR in API INSERT CUSTOMER => ', err));
//             }
//             if (!customer) {
//                 reject(console.log('NO CUSTOMERS ADDED , IN API ADD CUSTOMERS'));
//             }
//             resolve(console.log('ADDED CUSTOMER, IN API => ', customer));
//         });
//     });


//     Promise.all([getDrivers, updateDrivers, insertCustomer]).then((result) => {
//         console.log('RESULT AFTER RESOLVING PROMISES => ', result);
//         console.log('Printing DRIVERS ARRAY => ', driversArray);
//         console.log('Printing DRIVERS ARRAY.LENGTH =>', driversArray.length);
//         if (driversArray.length <= 1 || !driversArray) {
//             res.render('options');
//             return;
//         }
//         res.render('successful');
//     });

// });



module.exports = router;

// db.employeeData.find().forEach(function(element){
//     element.DOJ = element.DOJ.replace("1911", "2011");
//     db.employeeData.save(element);
//    })


// db.employeeData.find().forEach(function(element){  
//        var isoDate = element.DOJ;    
//         var isoString = isoDate.toISOString();    
//          element.DOJ = isoString;   
//            db.employeeData.save(element);  
//           }})

// db.employeeData.find().forEach(function(element){
//     element.DOJ = new Date(element.DOJ);
//     db.employeeData.save(element);
//    })






// router.put('/', (req, res) => {
//     var query = {
//         squad: req.body.squad
//     };

//     tribeInfo.getAllTribeInfo(query, (err, squad) => {
//         if (err) {
//             console.log('ERROR IN API GET ALL DOCS FROM A SQUAD => ', err);
//             return;
//         }
//         if (!squad) {
//             console.log('NO SQUAD FOUND');
//             return;
//         }
//         console.log('DOCS FROM A SQUAD IN API => ', squad);


//         var pos;
//         for (var i = 0; i < squad[0].monthlyProgress.length; i++) {
//             if (req.body.time === squad[0].monthlyProgress[i].time) {
//                 console.log('i =>', i);
//                 console.log('req.body.time === squad[0].monthlyProgress[i].time', req.body.time === squad[0].monthlyProgress[i].time)
//                 pos = i;
//                 break;
//             }
//         }
//         console.log('POS => ', pos);
//         console.log('squad[0].monthlyProgress[pos].time =>', squad[0].monthlyProgress[pos].time);

//         var oldQuery = {
//             squad: req.body.squad,
//             time: squad[0].monthlyProgress[pos].time
//         };

//         // squad[0].monthlyProgress[pos].score = req.body.score;
//         // console.log('squad[0].monthlyProgress[pos].score', squad[0].monthlyProgress[pos].score);

//         var newQuery = {
//             score: req.body.score
//         }

//         tribeInfo.updateTribe(oldQuery, newQuery, (err, result) => {
//             if (err) {
//                 console.log('ERROR IN API UPDATE SCORES OF A SQUAD => ', err);
//                 return;
//             }
//             console.log('UPDATED SCORES IN A SQUAD IN API => ', result);
//         });

//     });
// });