import { execSync } from 'child_process'

describe('CLI Version Command Validation', () => {
	test('Displays version with --version', () => {
		console.log('🚀 Starting test for --version command...')
		const output = execSync('node dist/bin/index.js --version', { stdio: 'pipe' }).toString()
		console.log('\n✅ CLI Output (--version Command):\n', output)
		// Check if the output contains the version
		expect(output).toContain('🌟 Version: 0.1.0')
		console.log('✅ Test passed: Version displayed correctly with --version.')
	})

	test('Displays version with -v', () => {
		console.log('🚀 Starting test for -v command...')
		const output = execSync('node dist/bin/index.js -v', { stdio: 'pipe' }).toString()
		console.log('\n✅ CLI Output (-v Command):\n', output)
		// Check if the output contains the version
		expect(output).toContain('🌟 Version: 0.1.0')
		console.log('✅ Test passed: Version displayed correctly with -v.')
	})
})
