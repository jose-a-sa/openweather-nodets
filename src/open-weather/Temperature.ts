export interface ITemperature {
    celsius: number;
    fahrenheit: number;
    kelvin: number;
}

export class Temperature implements ITemperature {

    private static ZERO_C: number = 273.15;
    private static ZERO_F: number = 459.67;

    private _t: number; // kelvin

    constructor(x: number = 0) {
        this.kelvin = x;
    }

    public get kelvin(): number {
        return this.round1(this._t);
    }

    public set kelvin(x: number) {
        this._t = x;
    }

    public get celsius(): number {
        return this.round1(this._t - Temperature.ZERO_C);
    }

    public set celsius(x: number) {
        this._t = this.round1(x);
    }

    public get fahrenheit(): number {
        return this.round1(this._t * 9 / 5 - Temperature.ZERO_F);
    }

    public set fahrenheit(x: number) {
        this._t = (x + Temperature.ZERO_F) * 5 / 9;
    }

    public toObject(): ITemperature {
        const obj: ITemperature = {
            celsius: this.celsius,
            fahrenheit: this.fahrenheit,
            kelvin: this.kelvin
        } as ITemperature;
        return obj;
    }

    private round1(x: number): number {
        return Math.round(x * 10) / 10;
    }
}
