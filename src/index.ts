import bodyParser from "body-parser";
import express from "express";
import { ClientRequest, IncomingMessage } from "http";
import https, { RequestOptions } from "https";
import path from "path";
import { OpenWeather } from "./open-weather/OpenWeather";

const app = express();
const port: number = 8000; // default port to listen

const apiKey: string = "4d16dd9231c3dfcf859146679a038bcd";

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// define a route handler for the default home page
app.get("/", (req, res) => {
    const openWeatherData: OpenWeather = new OpenWeather(undefined, false);
    res.render("index", openWeatherData.weatherApp);
});

app.post("/", (req, res) => {
    const city: string = req.body.city;
    // tslint:disable-next-line:no-console
    console.log(city);

    const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    // tslint:disable-next-line:no-console
    console.log(url);

    const weatherReq: ClientRequest = https.get(url, (r: IncomingMessage) => {
        let data: string = "";

        r.addListener("data", (chunk: any) => {
            data += chunk;
        });

        r.addListener("end", () => {
            const openWeatherData: OpenWeather = new OpenWeather(JSON.parse(data));
            res.render("index", openWeatherData.weatherApp);
        });
    });

    weatherReq.addListener("error", (error: Error) => {
        const openWeatherData: OpenWeather = new OpenWeather(undefined, true);
        res.render("index", openWeatherData.weatherApp);

        // tslint:disable-next-line:no-console
        console.log("Error: " + error.message);
    });
});

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
