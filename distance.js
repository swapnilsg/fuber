"use strict";

const calculateDistance =(long1,lat1,long2,lat2)=>{
    let long =long2-long1;
    let lat = lat2-lat1;
    return (Math.sqrt((long*long)+(lat*lat)));
};

const calculatePrice=(distance,pink)=>{
    let distancePrice = distance*2;
    //assuming cab travels 1KM/min
    let timePrice = distancePrice+distance;
    let totalAmount = (pink)?timePrice+5:timePrice;
    return totalAmount;
}

module.exports ={
    bookride:(cabs,userLat,userLong)=>{
        let shortDistance,nearestCab;
        //check for cabs availability
        if(cabs.length !== 0){
            //find the shortest distance cab for user
            cabs.forEach((index)=>{
                let distance=calculateDistance(index.lat,index.lan,userLat,userLong);
                if(shortDistance===undefined){
                    shortDistance=distance;
                    nearestCab=index;
                }else{
                    shortDistance=Math.min(shortDistance,distance);
                    nearestCab=index;
                }
            });
            //making available false for booked cab
            nearestCab.availabel=false;
            nearestCab.lat=userLat;
            nearestCab.lan=userLong;
            return nearestCab;
        }else{
            return "No cabs found, please try again later";
        }
    },
    endride:(cab,lat,long)=>{
        //calculating total distance of ride
        let totalDistance = calculateDistance(cab.lat,cab.lan,lat,long);
        let cost =calculatePrice(totalDistance,cab.pink);
        cab.lat=lat;
        cab.lan=long;
        cab.availabel=true;
        console.log(totalDistance);
        return "your total distance is: "+totalDistance+" and price is "+cost+" Dogecoin";
    }
};




