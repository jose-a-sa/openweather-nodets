import { EventEmitter } from "events";
import { ClientRequest, IncomingMessage } from "http";
import https from "https";
import { IWeatherApp } from "../IWeatherApp";
import { IOpenWeather } from "./IOpenWeather";
import { IOpenWeatherCurrent } from "./IOpenWeatherCurrent";
import { ITemperature, Temperature } from "./Temperature";

export class OpenWeather extends EventEmitter implements IWeatherApp, IOpenWeather {
    private _apiKey: string = "4d16dd9231c3dfcf859146679a038bcd";
    private _host: string = `https://api.openweathermap.org/data/2.5/weather?appid=${this._apiKey}`;

    private _data: IOpenWeatherCurrent;
    private _reqError: Error;

    constructor() {
        super();
    }

    public query(city?: string, country?: string): boolean {
        this._reqError = undefined;

        let url: string = "";
        if (city !== "") {
            url += `${this._host}&q=`;
            url += (country !== "") ? `${city},${country}` : `${city}`;
        } else {
            url = (country !== "") ? `${this._host}&q=${country}` : "";
        }

        if (url !== "") {
            const httpsReq: ClientRequest = https.get(url, (r: IncomingMessage) => {
                this.emit("queryStart", url, city, country);

                let incomingData: string = "";

                r.on("data", (chunk: any) => {
                    incomingData += chunk;
                    this.emit("queryData", chunk);
                });

                r.on("end", () => {
                    this._data = JSON.parse(incomingData) as IOpenWeatherCurrent;
                    this.emit("queryEnd", this.toWeatherApp());
                });
            });

            httpsReq.on("error", (error: Error) => {
                this._reqError = error;
                this.emit("queryError", this.toWeatherApp());
                // tslint:disable-next-line:no-console
                console.log("Error: " + error.message);
            });

            return true;
        } else {
            return false;
        }
    }

    public get requestSuccess(): boolean {
        if (this._reqError === undefined) {
            return true;
        }

        return false;
    }

    public get querySuccess(): boolean {
        if (!this.requestSuccess || this._data === undefined) {
            return false;
        }
        if (this._data.cod !== 200) {
            return false;
        }
        return true;
    }

    public get city(): string {
        if (!this.querySuccess) {
            return undefined;
        }
        return this._data.name;
    }

    public get temperature(): ITemperature {
        if (!this.querySuccess) {
            return undefined;
        }
        return (new Temperature(this._data.main.temp)).toObject();
    }

    public get countryCode(): string {
        if (!this.querySuccess) {
            return undefined;
        }
        return this._data.sys.country;
    }

    public toWeatherApp(): IWeatherApp {
        const obj: IWeatherApp = {
            city: this.city,
            countryCode: this.countryCode,
            querySuccess: this.querySuccess,
            requestSuccess: this.requestSuccess,
            temperature: this.temperature
        } as IWeatherApp;
        return obj;
    }

    public static get EMPTY_APP(): IWeatherApp {
        const wApp: IWeatherApp = {
            city: undefined,
            countryCode: undefined,
            querySuccess: false,
            requestSuccess: false,
            temperature: undefined
        } as IWeatherApp;
        return wApp;
    }
}
