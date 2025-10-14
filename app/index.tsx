import { Redirect } from "expo-router";
import { useAuthContext } from "@hooks/use-auth-context";

export default function Index() {
    const { isLoggedIn, isLoading } = useAuthContext()

    if (isLoading) {
        return null
    }
  return <Redirect href={isLoggedIn ? '/(tabs)' : '/(auth)/login'} />
}
