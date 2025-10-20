import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Text, TextInput, Button, useTheme, Icon} from 'react-native-paper';
import { useRouter } from 'expo-router';

import { authService } from "@services/authService";
export default function AuthForm() {
    const {colors} = useTheme();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAuth = async () => {
        if (!email || !password || (isRegister && !username)) {
            Alert.alert('Error', 'Por favor completa todos los campos requeridos');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = isRegister
                ? await authService.register(username, email, password)
                : await authService.login(email, password);

            if (error) {
                Alert.alert('Error', error.message);
            } else if (isRegister) {
                Alert.alert(
                    'Registro exitoso',
                    'Por favor verifica tu email para confirmar tu cuenta',
                    [{ text: 'OK', onPress: () => setIsRegister(false) }]
                );
            } else {
                router.replace('/(tabs)');
            }
        } catch (error) {
            Alert.alert('Error', 'Algo salió mal. Intenta de nuevo.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", marginBottom: 32 }}>
                <Icon source="shopping" size={120} />
                <Text variant="headlineMedium" style={{ marginTop: 16 }}>
                    {isRegister ? 'Crear cuenta' : 'Bienvenido'}
                </Text>
            </View>

            <View style={styles.input}>
                {isRegister && (
                    <TextInput
                        label="Nombre de usuario"
                        value={username}
                        onChangeText={setUsername}
                        mode="outlined"
                        disabled={loading}
                        left={<TextInput.Icon icon="account-outline" />}
                    />
                )}
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    disabled={loading}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    left={<TextInput.Icon icon="email-outline" />}
                />
                <TextInput
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    mode="outlined"
                    disabled={loading}
                    autoCapitalize="none"
                    left={<TextInput.Icon icon="lock-outline" />}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                />
            </View>

            {!isRegister && (
                <View style={styles.forgotButton}>
                    <TouchableOpacity disabled={loading}>
                        <Text style={{ color: colors.primary }}>
                            ¿Olvidaste tu contraseña?
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <Button
                mode="contained"
                onPress={handleAuth}
                loading={loading}
                disabled={loading}
                style={styles.mainButton}
            >
                {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
            </Button>

            <View style={styles.registerContainer}>
                <Text style={{ color: "#6B7280" }}>
                    {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                </Text>
                <TouchableOpacity
                    onPress={() => setIsRegister(!isRegister)}
                    disabled={loading}
                >
                    <Text style={[styles.link, { color: colors.primary }]}>
                        {isRegister ? ' Iniciar sesión' : ' Regístrate'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    input: {
        flexDirection: "column",
        gap: 16,
    },
    forgotButton: {
        alignSelf: "flex-end",
        marginTop: 16,
        marginBottom: 16,
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12,
    },
    mainButton: {
        marginTop: 8,
    },
    link: {
        color: "#D0BCFF",
        fontWeight: "600",
    },
});