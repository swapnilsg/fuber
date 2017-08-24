"use strict";

const calculateDistance =(long1,lat1,long2,lat2)=>{
    let long =long2-long1;
    let lat = lat2-lat1;
    return (Math.sqrt((long*long)+(lat*lat)));
};


module.exports ={
    bookride:(cabs,userLat,userLong)=>{
        let shortDistance,nearestCab;
        if(cabs.length !== 0){
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
            return nearestCab;
        }else{
            return "No cabs found, please try again later";
        }
    },
    endride:()=>{

    }
}




