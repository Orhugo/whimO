import { MD3DarkTheme, MD3LightTheme, configureFonts, MD3Theme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

const baseFonts = configureFonts({ config: {} });

export const lightTheme: MD3Theme = {
    ...MD3LightTheme,
    fonts: baseFonts,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#6750A4',
        secondary: '#625B71',
    },
};

export const darkTheme: MD3Theme = {
    ...MD3DarkTheme,
    fonts: baseFonts,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#D0BCFF',
        secondary: '#ccc000',
    },
};

export function useAppTheme() {
    const scheme = useColorScheme();
    return scheme === 'dark' ? darkTheme : lightTheme;
}
