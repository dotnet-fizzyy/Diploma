module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    testRegex: '(/test/.*)\\.(ts|tsx|js|jsx)$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
