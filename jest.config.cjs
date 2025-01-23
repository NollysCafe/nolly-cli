module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@src/(.*)$': '<rootDir>/src/$1'
	},
	transform: {
		'^.+\\.ts$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'js'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/', '/templates/'],
	extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ES modules
}
