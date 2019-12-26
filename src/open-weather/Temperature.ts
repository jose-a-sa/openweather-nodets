export interface ITemperature {
    readonly celsius: number;
    readonly fahrenheit: number;
    readonly kelvin: number;
}

export class Temperature implements ITemperature {

    private static ZERO_C: number = 273.15;
    private static ZERO_F: number = 459.67;

    private _e: number;
    private _t: number; // kelvin

    constructor(x: number = 0) {
        this._t = 0;
        this._e = 0;
        this.kelvin = x;
    }

    public get kelvin(): number {
        return this.roundDecimalPlace(this._t, this._e);
    }

    public set kelvin(x: number) {
        this._t = x;
    }

    public get celsius(): number {
        return this.roundDecimalPlace(this._t - Temperature.ZERO_C, this._e);
    }

    public set celsius(x: number) {
        this._t = this.roundDecimalPlace(x);
    }

    public get fahrenheit(): number {
        return this.roundDecimalPlace(this._t * 9 / 5 - Temperature.ZERO_F, this._e);
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

    public toString(): string {
        return JSON.stringify(Object.assign({}, this.toObject()), null, "  ");
    }

    private roundDecimalPlace(x: number, exponent: number = 0): number {
        if (!Number.isInteger(exponent)) {
            // tslint:disable-next-line:no-console
            console.log(`Warning: the exponent ${exponent} will be converted to ${Math.floor(exponent)}`);
            exponent = Math.floor(exponent);
        }
        return Math.round(x * Math.pow(10, exponent)) / Math.pow(10, exponent);
    }
}
