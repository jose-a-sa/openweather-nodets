import { EventEmitter } from "events";
import { IWeatherApp } from "../IWeatherApp";

export interface IOpenWeather extends EventEmitter {
    emit(event: "queryStart", url: string, city?: string, country?: string): boolean;
    emit(event: "queryEnd" | "queryError", wApp: IWeatherApp): boolean;
    emit(event: "queryData", chunk: any): boolean;
    // emit(event: string | symbol, ...args: any[]): boolean;
    on(event: "queryStart", listener: (url: string, city?: string, country?: string) => void): this;
    on(event: "queryEnd" | "queryError", listener: (wApp: IWeatherApp) => void): this;
    on(event: "queryData", listener: (chunk: any) => void): this;
}
