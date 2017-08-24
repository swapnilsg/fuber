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
    }else {
        let availabelCabs = _.where(cars, {availabel: true,pink:false});
        let bookedCab = distance.bookride(availabelCabs,userLat,userLong);
        res.send(bookedCab);
    }
});

app.get('/endride',(req,res)=>{
    let userLat = req.query.lat;
    let userLong=req.query.long;
    let cab =parseInt(req.query.id);
    let bookedCab = _.findWhere(cars,{id:cab});
    let endride = distance.endride(bookedCab,userLat,userLong);
    res.send(endride);
});

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});