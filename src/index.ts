import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { IWeatherApp } from "./IWeatherApp";
import { OpenWeather } from "./open-weather/OpenWeather";
import { ITemperature, Temperature } from "./open-weather/Temperature";

const app = express();
const port: number = 8000; // default port to listen

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.render("index", OpenWeather.EMPTY_APP);
});

app.post("/", (req, res) => {
    const city: string = req.body.city;
    const country: string = req.body.country;

    const openWeather: OpenWeather = new OpenWeather();

    if (openWeather.query(city, country)) {
        openWeather.on("queryEnd", (wApp: IWeatherApp) => {
            res.render("index", wApp);
        });

        openWeather.on("queryError", (wApp: IWeatherApp) => {
            res.render("index", wApp);
        });
    } else {
        res.render("index", openWeather.toWeatherApp());
    }
});

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
