import {PropsWithChildren} from 'react';
import {View, ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';

export default function Screen({
                   children,
                   style,
                   withHeader = false,
                   padding = 16,
                   ...rest
               }: PropsWithChildren<ViewProps> & { withHeader?: boolean; padding?: number }) {
    const theme = useTheme();
    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: theme.colors.background}}
            edges={withHeader ? ['left', 'right', 'bottom'] : ['top', 'left', 'right', 'bottom']}
            {...rest}
        >
            <View style={[{flex: 1, padding}, style]}>{children}</View>
        </SafeAreaView>
    );
}
