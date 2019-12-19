import { ITemperature } from "./open-weather/Temperature";

export interface IWeatherApp {
    city: string;
    countryCode: string;
    querySuccess: boolean;
    requestSuccess: boolean;
    temperature: ITemperature;
}
