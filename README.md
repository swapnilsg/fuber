# fuber
cab booking app
This application is built in Node.js using Express framework. 

The file 'models.js' has all the methods used in this application.</br>
The method 'bookride' will book a cab based on the given parameters.It checks whether user wants to book Pink cab or normal cab and
book the cab with shortest distance.<br><br>
The method 'endride' will end ride.It takes the cab id as parameter.it will update the cab location to users drop locaton and will be available 
for other to book. This method returns the total distance travlled and Price.<br>
<br>
The methods 'calculateDistance' and 'calculatePrice' are used to calculate distance and price respectively.<br><br>
To run the app runt the following commands.<br>
npm install<br>
node server.js
<br>To run test: <br>
npm run test

