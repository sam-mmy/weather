// const {response} = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {
    const city = req.body.cityName;
    const appid = "4a6bc93953d8575a3bf9749216dc3439";
    const unit = "metrics"
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + appid + "&units=" + unit, function (response) {
        console.log(response.statusCode);



        response.on("data", function (data) {
            var weatherdata = JSON.parse(data);
            console.log(weatherdata);

            const temp = Math.floor((weatherdata.main.temp) - 273.15);
            console.log(temp);

            const desp = weatherdata.weather[0].description
            console.log(desp)
            const icon = weatherdata.weather[0].icon
            const weatherImg = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            const currentWeather = (" and the current weather is " + desp);
            res.write("<h1>The tempearture in "+ city + " is "+ temp + " degree celcius. <br>" + currentWeather + "</h1>");
            res.write(" <img src=" + weatherImg + ">")
            res.send();

        });

    });
});



app.listen(3000, function () {
    console.log("server started");
});