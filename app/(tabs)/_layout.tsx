import {Tabs} from 'expo-router';
import {useTheme} from 'react-native-paper'
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function TabsLayout() {
    const theme = useTheme();

    const makeIcon = (name: keyof typeof MaterialCommunityIcons.glyphMap) =>
        ({ color, size }: { color: string; size: number }) =>
            <MaterialCommunityIcons name={name} size={size} color={color} />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: makeIcon('home-outline'),
                }}
            />
            <Tabs.Screen
                name="goals"
                options={{
                    title: 'Goals',
                    tabBarIcon: makeIcon('flag-outline'),
                }}
            />
            <Tabs.Screen
                name="whims"
                options={{
                    title: 'Whims',
                    tabBarIcon: makeIcon('gift-outline'),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: makeIcon('account-outline'),
                }}
            />
        </Tabs>
    )
}