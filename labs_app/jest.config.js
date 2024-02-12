/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!(@bundled-es-modules)/)',
    ],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
