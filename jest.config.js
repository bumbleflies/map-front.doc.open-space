const preset = require('ts-jest/presets')
const esModules = ['react-leaflet'].join('|');
// https://github.com/kulshekhar/ts-jest/blob/main/examples/react-app/jest.config.cjs
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    ...preset.jsWithTsESM,
    setupFiles: ['react-app-polyfill/jsdom'],
    testMatch: ['<rootDir>/src/__tests__/*.{js,jsx,ts,tsx}'],

    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "axios": require.resolve('axios'),
        "react-leaflet": "<rootDir>/src/__tests__/mocks/reactLeafletMock.js"
    },
    transformIgnorePatterns: [
        `<rootDir>/node_modules/(?!${esModules})`,
    ],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                babelConfig: {
                    presets: ['react-app'],
                },
            },
        ],
    },
    resetMocks: true,

};