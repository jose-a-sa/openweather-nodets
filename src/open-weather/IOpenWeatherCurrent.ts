export interface IGeoCoordinate {
    lon: number;
    lat: number;
}

export interface IWeatherItem {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IMainData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
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
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IOpenWeatherCurrent {
    coord: IGeoCoordinate;
    weather: IWeatherItem[];
    base: string;
    main: IMainData;
    visibility: number;
    wind: IWindData;
    clouds: ICloudData;
    dt: number;
    sys: ICityData;
    timezone: number;
    id: number;
    name: string;
    cod: number;
    message: string;
}
