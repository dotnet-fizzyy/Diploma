module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    testRegex: '(/test/.*)\\.(ts|tsx)$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
