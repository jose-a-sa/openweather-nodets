import { EventEmitter } from "events";
import { IWeatherApp } from "../IWeatherApp";
import { IOpenWeatherCurrent } from "./IOpenWeatherCurrent";
import { ITemperature, Temperature } from "./Temperature";

export class OpenWeather {

    private data: IOpenWeatherCurrent;
    private error: boolean;

    constructor(d?: IOpenWeatherCurrent, e: boolean = false) {
        this.data = d;

        if (d === undefined) {
            this.error = e;
        } else {
            this.error = (this.data.main === undefined);
        }
    }

    public getData(): IOpenWeatherCurrent {
        return this.data;
    }

    public get dataReady(): boolean {
        return !(this.data === undefined);
    }

    public get city(): string {
        if (this.data === undefined) {
            return null;
        }

        if (this.data.name === undefined) {
            return null;
        } else {
            return this.data.name;
        }
    }

    public get temperature(): ITemperature {
        if (this.data === undefined) {
            return null;
        }

        if (this.data.main === undefined) {
            return null;
        } else {
            return  new Temperature(this.data.main.temp);
        }
    }

    public get weatherApp(): IWeatherApp {
        const r: IWeatherApp = {} as IWeatherApp;
        r.error = this.error;
        r.city = this.city;
        r.dataReady = this.dataReady;
        r.temperature = this.temperature;
        return r;
    }
}
