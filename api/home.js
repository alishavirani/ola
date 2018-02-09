const express = require('express');
// const client = require('./../server');
const driver = require('./../controller/insertDriver');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.post('/', (req, res) => {

    console.log('Inside POST of API');
    let drivers = req.body.driver;
    console.log('Printing no of drivers', drivers);
    var numDriver = Number(drivers);
    //console.log('Typeof numDriver', typeof numDriver);

    let driverInfo = {
        driverID: Date.now().toString()
    }
    
    for(let i = 1; i <= numDriver; i++) {
         console.log('Inside for loop');
         driverInfo.driverID++;

        //call to controller
        driver.addDriver(driverInfo, (err, result) => {
            // console.log('Inside API..Printing result', result);
            if(err) {
                console.log('Error in API---',err);
                return;
            }
            if(!result) {
                console.log('No result obtained in API');
                return;
            }
            console.log('Printing driver info ie Result obj ==> ', result);
           
        });
        
    }
    res.render('cabBooking');
});

module.exports = router;