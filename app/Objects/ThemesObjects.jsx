import {
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";

const themeOptions = {
    dark_theme: {
        ...DarkTheme,
        background: '#14213d',
        primary_colour: '#fca311',
        secondary_colour: '#e5e5e5',
        text: '#ffffff',

    },
    light_theme: {
        ...DefaultTheme,
        background: '#7AE1E1',
        primary_colour: '#e17a7a',
        secondary_colour: '#fca311',
        text: '#000000',
    },


}

export default themeOptions
