import bodyParser from "body-parser";
import express from "express";
import { IncomingMessage } from "http";
import https, { RequestOptions } from "https";
import path from "path";

const app = express();
const port = 8000; // default port to listen

const apiKey = "4d16dd9231c3dfcf859146679a038bcd";

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// define a route handler for the default home page
app.get("/", (req, res) => {
    // render the index template
    res.render("index", {
        error: null,
        weather: null
    });
});

app.post("/", (req, res) => {
    const city = req.body.city;
    // tslint:disable-next-line:no-console
    console.log(city);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    // tslint:disable-next-line:no-console
    console.log(url);

    const weatherReq = https.get(url, (r: IncomingMessage) => {
        let data: string = "";

        r.on("data", (chunk: any) => {
            data += chunk;
        });

        r.on("end", () => {
            const weather: OpenWeather.IOpenWeather = JSON.parse(data);
            if (weather.main === undefined) {
                res.render("index", {
                    error: "Error, please try again",
                    weather: null
                });
            } else {
                const celsiusTemp: number = Math.round((weather.main.temp - 273.16) * 10) / 10;
                const weatherText: string = `It's ${celsiusTemp} degrees in ${weather.name}!`;

                res.render("index", {
                    error: null,
                    weather: weatherText
                });
            }
            // tslint:disable-next-line:no-console
            console.log("Data: " + JSON.parse(data));
        });
    });

    weatherReq.on("error", (error: Error) => {
        res.render("index", {
            error: "Error, please try again",
            weather: null
        });
        // tslint:disable-next-line:no-console
        console.log("Error: " + error.message);
    });
});

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
