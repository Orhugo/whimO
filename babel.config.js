module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ['module-resolver', {
                alias: {
                    '@app': './app',
                    '@assets': './assets',
                    '@components': './components',
                    '@hooks': './hooks',
                    '@lib': './lib',
                    '@services': './services',
                    '@theme': './theme',
                    '@types': './types',
                },
                extensions: ['.tsx', '.ts', '.js', '.json'],
            }],

            'react-native-paper/babel',

            'react-native-reanimated/plugin',
        ],
    };
};
