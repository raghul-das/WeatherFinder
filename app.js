const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");    
});

app.post( "/", function(req, res) {

    const query = req.body.CityName;
    const AppId = "96c825833bc7ead4599637f24442a056";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + AppId + "&units=metric";
    
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {     
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl ="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            const weatherDescription = weatherData.weather[0].description;
            res.write("<h1>The temparature in " + query + " is " + temp + " degrees</h1>");
            res.write("<p> The Weather now is " + weatherDescription + "</p>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    })

});

app.listen( process.env.NODE_ENV || 3000, function () {
    console.log("Server is running at port 3000");
});

