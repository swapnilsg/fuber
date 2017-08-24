const express =require('express');
const _ = require('underscore');
const distance = require('./distance');
const app = express();



let cars=[{
    id:101,
    lan:12.926334,
    lat:77.488129,
    availabel:true,
    pink:false
},{
    id:102,
    lan:12.928342,
    lat:77.486198,
    availabel:true,
    pink:false
},{
    id:103,
    lan:12.922606,
    lat:77.488886,
    availabel:true,
    pink:true
}];


app.get('/bookride',(req,res)=>{
    let userLat = req.query.lat;
    let userLong=req.query.long;
    let pinkCab=req.query.pink;

    if(pinkCab){
        let pinkcabs=_.where(cars,{pink:true,availabel:true});
        let bookedCab = distance.bookride(pinkcabs,userLat,userLong);
        res.send(bookedCab);
        /*if(pinkcabs.length !== 0){
            let bookedCabs=distance.bookride(pinkcabs,userLat,userLong);
            bookedCabs.availabel=false;
            res.send(bookedCabs);
        }else{
            res.send("No pink cabs availabel at this time Please try again later");
        }*/
    }else {
        let availabelCabs = _.where(cars, {availabel: true,pink:false});
        /*if (availabelCabs.length !== 0) {
            let bookedCar= distance.bookride(availabelCabs,userLat,userLong);
            bookedCar.availabel=false;
            console.log("car booked",bookedCar);
            res.send(bookedCar);
        } else {
            res.send("No cabs availabel at this time Please try again later");
        }*/
        //console.log("availabel cars",availabelCabs);
    }
});

app.get('/endride',(req,res)=>{
    let userLat = req.query.lat;
    let userLong=req.query.long;


});

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});