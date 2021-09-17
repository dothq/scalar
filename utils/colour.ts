const toHexadecimal = (num: number) => {
    return num.toString(16).length == 1 
        ? "0" + num.toString(16) 
        : num.toString(16);
}

const hexToRgb = (hex: any) => {
    return hex.replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m: any, r: any, g: any, b: any) => {
            return `#${r}${r}${g}${g}${b}${b}`
    })
    .substring(1).match(/.{2}/g)
    .map((x: any) => parseInt(x, 16))
}

export class Colour {
    public r: number = 0;
    public g: number = 0;
    public b: number = 0;
    public a: number = 1;

    public adjust(percent: number) {
        const hexed = this.toHex(1);
        
        const adjusted = hexed
            .replace(/^#/, '')
            .replace(/../g, colour => ('0'+Math.min(255, Math.max(0, parseInt(colour, 16) + percent)).toString(16))
            .substr(-2));

        const [r, g, b] = hexToRgb(adjusted);

        this.r = r;
        this.g = g;
        this.b = b;

        return this;
    }

    public lighten(percent: number) { return this.adjust(+percent) }
    public darken(percent: number) { return this.adjust(-percent) }

    public toHex(opacity?: number) {
        let hexOpacity = opacity
            ? Math.round(opacity * 255).toString(16)
            : this.a !== 1
                ? Math.round(this.a * 255).toString(16)
                : "";

        if(hexOpacity.length == 1) hexOpacity = "0" + hexOpacity;

        return [
            "#", 
            toHexadecimal(this.r), 
            toHexadecimal(this.g), 
            toHexadecimal(this.b),
            hexOpacity
        ].join("")
    }

    public toRGB(opacity?: number) {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${opacity || this.a})`
    }

    public constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}