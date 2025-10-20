import { View, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Screen from '@components/ui/Screen';
import { authService } from '@services/authService';
import { useAuthContext } from '@hooks/use-auth-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const { session, profile } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Cerrar sesión',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        const { error } = await authService.logout();

                        if (error) {
                            Alert.alert('Error', 'No se pudo cerrar sesión');
                        } else {
                            router.replace('/(auth)/auth');
                        }
                        setLoading(false);
                    },
                },
            ]
        );
    };

    return (
        <Screen>
            <View style={{ flex: 1, padding: 16 }}>
                <Text variant="headlineMedium">Perfil</Text>

                <View style={{ marginTop: 24, gap: 12 }}>
                    <Text variant="titleMedium">Email:</Text>
                    <Text>{session?.user?.email}</Text>

                    {profile?.username && (
                        <>
                            <Text variant="titleMedium" style={{ marginTop: 12 }}>
                                Usuario:
                            </Text>
                            <Text>{profile.username}</Text>
                        </>
                    )}
                </View>

                <Button
                    mode="contained"
                    onPress={handleLogout}
                    loading={loading}
                    disabled={loading}
                    style={{ marginTop: 32 }}
                >
                    Cerrar sesión
                </Button>
            </View>
        </Screen>
    );
}