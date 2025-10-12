import {Stack} from "expo-router";
import {PaperProvider, adaptNavigationTheme} from "react-native-paper";
import {useAppTheme} from "../theme";
import {
    ThemeProvider as NavigationThemeProvider,
    DefaultTheme as NavLight,
    DarkTheme as NavDark,
} from "@react-navigation/native"

export default function RootLayout() {
    const theme = useAppTheme();

    const {LightTheme, DarkTheme} = adaptNavigationTheme({
        reactNavigationLight: NavLight,
        reactNavigationDark: NavDark,
    })
    const navTheme = theme.dark ? DarkTheme : LightTheme

    return (
        <PaperProvider theme={theme}>
            <NavigationThemeProvider value={navTheme}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: {backgroundColor: theme.colors.background}
                    }}
                />
            </NavigationThemeProvider>
        </PaperProvider>
    )
}
