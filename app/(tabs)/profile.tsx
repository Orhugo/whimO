import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Screen from '@components/ui/Screen';

export default function ProfileScreen() {
    return (
        <Screen>
            <View style={{flex: 1, padding: 16}}>
                <Text variant="headlineMedium">¡Hola!</Text>
                <Text>Esta es la pestaña Perfil</Text>
            </View>
        </Screen>
    );
}