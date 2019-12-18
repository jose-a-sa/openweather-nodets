import { ITemperature } from "./open-weather/Temperature";

export interface IWeatherApp {
    error: boolean;
    dataReady: boolean;
    city: string;
    temperature: ITemperature;
}
