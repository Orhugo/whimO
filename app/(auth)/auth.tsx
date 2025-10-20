import {View} from 'react-native';
import Screen from '@components/ui/Screen';
import AuthForm from "@components/auth/AuthForm";

export default function LoginScreen() {
    return (
        <Screen>
            <View style={{flex: 1}}>
                <AuthForm/>
            </View>
        </Screen>
    );
}