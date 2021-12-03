import { Colour } from "../utils/colour";

const base = {
    Red: new Colour(246, 66, 66, 1),
    Orange: new Colour(255, 122, 0, 1),
    Yellow: new Colour(255, 204, 50, 1),
    Green: new Colour(13, 215, 98, 1),
    Neon: new Colour(0, 255, 183, 1),
    Blue: new Colour(22, 98, 211, 1),
    BlueLight: new Colour(244, 248, 254, 1),
    Violet: new Colour(116, 44, 208, 1),
    Pink: new Colour(195, 44, 208, 1),
    Madder: new Colour(208, 44, 103, 1),
    Bingus: new Colour(207, 155, 144, 1),
    PureBlack: new Colour(9, 9, 10, 1),
    Void: new Colour(1, 0, 0, 1),
    Black: new Colour(25, 26, 28, 1),
    Gray1: new Colour(24, 23, 29, 1),
    Gray2: new Colour(26, 26, 34, 1),
    Gray3: new Colour(52, 52, 52, 1),
    Gray4: new Colour(115, 115, 115, 1),
    Gray5: new Colour(182, 182, 182, 1),
    Gray6: new Colour(234, 234, 234, 1),
    Gray7: new Colour(249, 249, 249, 1),
    White: new Colour(255, 255, 255, 1),
    Transparent: new Colour(0, 0, 0, 0)
}

export const ThemeColours: Record<any, Colour> = {
    ...base,
    ...Object.assign({}, ...Object.entries(base)
        .map(([key, value]) => { 
            return { [(key.toLowerCase())]: value } 
        }))
}

export const ThemeColoursRGB = Object.assign({}, ...Object.entries(ThemeColours)
    .map(([key, value]) => { 
        return { [(key.toLowerCase())]: value.toRGB() } 
    }))

export const ThemeColoursHex = Object.assign({}, ...Object.entries(ThemeColours)
    .map(([key, value]) => { 
        return { [(key.toLowerCase())]: value.toHex() } 
    }))