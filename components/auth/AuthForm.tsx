import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, TextInput, Button, useTheme, Icon} from 'react-native-paper';

export default function AuthForm() {
    const {colors} = useTheme();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    return (
        <View style={styles.container}>
            <View style={{alignItems: "center", marginBottom: 16, backgroundColor: "red"}}>
                <Icon
                    source="shopping"
                    size={200}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    mode="outlined"
                    left={<TextInput.Icon icon="account-outline"/>}
                />
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
                <TouchableOpacity>
                    <Text>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <Button
                mode="elevated"
                buttonColor={colors.primary}
                textColor={colors.onPrimary}
                onPress={() => console.log('Login')}
            >
                Login
            </Button>
            <View style={styles.registerContainer}>
                <Text style={{color: "#6B7280"}}>
                    You don&#39;t have an account?
                </Text>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.link}> Sign Up</Text>
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