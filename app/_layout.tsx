import {Stack} from "expo-router";
import {PaperProvider, adaptNavigationTheme} from "react-native-paper";
import {useAppTheme} from "../theme";
import {
    ThemeProvider as NavigationThemeProvider,
    DefaultTheme as NavLight,
    DarkTheme as NavDark,
} from "@react-navigation/native"
import AuthProvider from "@/providers/auth-provider";
import {SplashScreenController} from "@components/ui/SplashScreenController";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useFonts} from 'expo-font'

export default function RootLayout() {
    const theme = useAppTheme();

    const [fontsLoaded] = useFonts({
        ...MaterialCommunityIcons.font,
    });

    const {LightTheme, DarkTheme} = adaptNavigationTheme({
        reactNavigationLight: NavLight,
        reactNavigationDark: NavDark,
    })
    const navTheme = theme.dark ? DarkTheme : LightTheme

    return (
        <PaperProvider theme={theme} settings={{
            icon: props => <MaterialCommunityIcons {...props} />
        }}>
            <NavigationThemeProvider value={navTheme}>
                <AuthProvider>
                    <SplashScreenController/>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: {backgroundColor: theme.colors.background}
                        }}
                    />
                </AuthProvider>
            </NavigationThemeProvider>
        </PaperProvider>
    )
}
