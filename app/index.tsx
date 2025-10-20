import { Redirect } from "expo-router";
import { useAuthContext } from "@hooks/use-auth-context";

export default function Index() {
    const { isLoggedIn, isLoading } = useAuthContext();

    console.log('[Index] Render:', { isLoading, isLoggedIn });

    // Mientras carga, no redirigir (el SplashScreen se encarga)
    if (isLoading) {
        console.log('[Index] Still loading...');
        return null;
    }

    const redirectTo = isLoggedIn ? '/(tabs)' : '/(auth)/auth';
    console.log('[Index] Redirecting to:', redirectTo);

    // Redirigir según el estado de autenticación
    return <Redirect href={redirectTo} />;
}