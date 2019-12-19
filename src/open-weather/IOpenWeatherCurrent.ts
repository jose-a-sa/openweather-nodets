import { test } from "shelljs";

export interface IGeoCoordinate {
    lon: number;
    lat: number;
}

export interface IWeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IMainData {
    temp: number; // Temperature. Unit Default: Kelvin
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number; // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
    humidity: number; // Humidity, %
    sea_level: number; // Atmospheric pressure on the sea level, hPa
    grnd_level: number; // Atmospheric pressure on the ground level, hPa
}

export interface IWindData {
    speed: number;
    deg: number;
}

export interface ICloudData {
    all: number;
}

export interface ICityData {
    type: number;
    id: number;
    message: string;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IPrecipitationData {
    "1h": number; // snow/rain volume for the last 1 hour, mm
    "3h": number; // snow/rain volume for the last 3 hours, mm
}

export interface IOpenWeatherCurrent {
    coord: IGeoCoordinate;
    weather: IWeatherCondition[];
    base: string;
    main: IMainData;
    visibility: number;
    wind: IWindData;
    clouds: ICloudData;
    rain: IPrecipitationData;
    snow: IPrecipitationData;
    dt: number;
    sys: ICityData;
    timezone: number;
    id: number;
    name: string;
    cod: number;
    message: string;
}
