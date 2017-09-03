const express =require('express');
const _ = require('underscore');
const distance = require('./models');
const app = express();

let model=new distance();

app.get('/bookride',(req,res)=>{
    let userLat = req.query.lat;
    let userLong=req.query.long;
    let pinkCab=req.query.pink;
    let response = model.bookride(pinkCab,userLat,userLong);
    res.send(response);
});

app.get('/endride',(req,res)=>{
    let userLat = req.query.lat;
    let userLong=req.query.long;
    let cabid =parseInt(req.query.id);
    let endride = model.endride(cabid,userLat,userLong);
    res.send(endride);
});

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});