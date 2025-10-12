import {View} from 'react-native';
import Screen from '@components/ui/Screen';
import { Text } from 'react-native-paper';

export default function GoalsScreen() {
    return (
        <Screen>
            <View>
                <Text variant="headlineMedium">¡Hola!</Text>
                <Text>Esta es la pestaña Objetivos</Text>
            </View>
        </Screen>
    );
}