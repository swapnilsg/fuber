"use strict";
const _ = require('underscore');
const cars = require('./cars');

class models{
    calculateDistance(lat1,long1,lat2,long2){
        let long =long2-long1;
        let lat = lat2-lat1;
        return (Math.sqrt((long*long)+(lat*lat)));
    };

    calculatePrice(distance,pink){
        let distancePrice = distance*2;
        //assuming cab travels 60KMPH
        let timePrice = distancePrice+distance;
        return ((pink)?timePrice+5:timePrice);
    };
    bookride(pink, userLat, userLong){
        let shortDistance, nearestCab={};
        //check for pink cabs preference...
        let cabs=(pink)?_.where(cars,{pink:true,availabel:true}):_.where(cars, {availabel: true,pink:false});
        //check for cabs availability
        if (cabs.length !== 0) {
            //find the shortest distance cab for user
            cabs.forEach((index) => {
                let distance = this.calculateDistance(index.lat, index.lan, userLat, userLong);
                //console.log(distance, index.id);
                if (shortDistance === undefined) {
                    shortDistance = distance;
                    nearestCab = index;
                } else if (distance < shortDistance) {
                    shortDistance = distance;
                    nearestCab = index;
                }
                //console.log(shortDistance);
            });
            //making available false for booked cab
            nearestCab.availabel = false;
            nearestCab.lat = userLat;
            nearestCab.lan = userLong;
            return nearestCab;
        } else {
            return "No cabs found, please try again later";
        }
    }
    endride(cabid, lat, long) {
        //find the booked cab by the user based on cab id
        let bookedCab = _.findWhere(cars,{id:cabid});
        //console.log("booked cab",bookedCab);
        //calculating total distance of ride
        let totalDistance = this.calculateDistance(bookedCab.lat, bookedCab.lan, lat, long);
        //calculate the price for the user..
        let cost = this.calculatePrice(totalDistance, bookedCab.pink);
        //change the location to the user drop location and wait for next ride...
        bookedCab.lat = lat;
        bookedCab.lan = long;
        bookedCab.availabel = true;
        //console.log("new loca",bookedCab);
        return "your total distance is: " + totalDistance + " and price is " + cost + " Dogecoin";
    }

}
module.exports=models;


