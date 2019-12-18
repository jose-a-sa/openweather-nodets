export interface ITemperature {
    kelvin: number;
    celsius: number;
    fahrenheit: number;
}

export class Temperature implements ITemperature {
    private temp: number; // kelvin

    constructor(x: number) {
        this.kelvin = x;
    }

    public get kelvin(): number {
        return this.round1(this.temp);
    }

    public set kelvin(x: number) {
        this.temp = x;
    }

    public get celsius(): number {
        return this.round1(this.temp - 273.15);
    }

    public set celsius(x: number) {
        this.temp = this.round1(x);
    }

    public get fahrenheit(): number {
        return this.round1(this.temp * 9 / 5 - 459.67);
    }

    public set fahrenheit(x: number) {
        this.temp = (x + 459.67) * 5 / 9;
    }

    private round1(x: number): number {
        return Math.round(x * 10) / 10;
    }
}
