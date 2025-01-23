import { execSync } from 'child_process'

describe('Help Command Validation', () => {
	test('Displays help message with --help', () => {
		console.log('🚀 Starting test for --help command...')
		const output = execSync('node dist/bin/index.js --help', { stdio: 'pipe' }).toString()
		console.log('\n✅ CLI Output (--help Command):\n', output)
		// Check for critical elements
		expect(output).toContain('--help')
		expect(output).toContain('-h')
		expect(output).toContain('--version')
		expect(output).toContain('-v')
		expect(output).toContain('new')
		expect(output).toContain('list')
		console.log('✅ Test passed: Help message displayed correctly with --help.')
	})

	test('Displays help message with -h', () => {
		console.log('🚀 Starting test for -h command...')
		const output = execSync('node dist/bin/index.js -h', { stdio: 'pipe' }).toString()
		console.log('\n✅ CLI Output (-h Command):\n', output)
		// Check for critical elements
		expect(output).toContain('--help')
		expect(output).toContain('-h')
		expect(output).toContain('--version')
		expect(output).toContain('-v')
		expect(output).toContain('new')
		expect(output).toContain('list')
		console.log('✅ Test passed: Help message displayed correctly with -h.')
	})
})
