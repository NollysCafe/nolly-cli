import { execSync } from 'child_process'

describe('Template List Command Validation', () => {
	it('Displays available templates with list', () => {
		console.log('🚀 Starting test for list command...')

		// Execute the CLI command
		const output = execSync('node dist/bin/index.js list', { encoding: 'utf8' }).trim()

		console.log('\n✅ CLI Output (List Command):\n', output)

		// Assertions: Check for key phrases in the output
		expect(output).toContain('Available Templates')
		expect(output).toContain('frontend')
		expect(output).toContain('backend')
		expect(output).toContain('fullstack')

		console.log('✅ Test passed: List command displays available templates correctly.')
	})
})
