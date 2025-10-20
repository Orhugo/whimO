import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, TextInput, Button, useTheme, Icon} from 'react-native-paper';
import { authService } from "@services/authService";

export default function AuthForm() {
    const {colors} = useTheme();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(true);

    return (
        <View style={styles.container}>
            <View style={{alignItems: "center", marginBottom: 16}}>
                <Icon
                    source="shopping"
                    size={170}
                />
            </View>
            <View style={styles.input}>
                {isRegister && (
                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        mode="outlined"
                        left={<TextInput.Icon icon="account-outline"/>}
                    />
                    )
                }
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    left={<TextInput.Icon icon="email-outline"/>}
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    mode="outlined"
                    left={<TextInput.Icon icon="lock-outline"/>}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                />
            </View>
            <View style={styles.forgotButton}>
                {!isRegister && (
                    <TouchableOpacity>
                        <Text>Forgot password?</Text>
                    </TouchableOpacity>
                )}
            </View>
            {isRegister ? (
                <Button
                    mode="elevated"
                    buttonColor={colors.primary}
                    textColor={colors.onPrimary}
                    onPress={() => console.log('Sign Up')}
                >
                    Sign Up
                </Button>
            ) : (
                <Button
                    mode="elevated"
                    buttonColor={colors.primary}
                    textColor={colors.onPrimary}
                    onPress={() => console.log('Sign I')}
                >
                    Sign In
                </Button>
            )}
            <View style={styles.registerContainer}>
                {isRegister ? (
                    <Text style={{color: "#6B7280"}}>
                        Do you have an account?
                    </Text>
                ) : (
                    <Text style={{color: "#6B7280"}}>
                        You don&#39;t have an account?
                    </Text>
                )}
                <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
                    {isRegister ? (
                        <Text style={styles.link}> Sign In</Text>
                    ) : (
                        <Text style={styles.link}> Sign Up</Text>
                    )}
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
    link: {
        color: "#D0BCFF",
        fontWeight: "600",
    },
});