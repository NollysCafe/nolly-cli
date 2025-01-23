import { execSync } from 'child_process'

describe('Invalid Command Handling', () => {
	test('Fails with an invalid command', () => {
		console.log('🚀 Starting test for invalid command...')
		try {
			execSync('node dist/bin/index.js unknown-command', { stdio: 'pipe' }).toString()
		} catch (error: any) {
			const output = error.stderr?.toString()
			console.log('\n✅ CLI Output (Invalid Command Test):\n', output)
			expect(output).toContain('❌ Error: Invalid command.')
			expect(output).toContain('Use --help to see available options.')
			console.log('✅ Test passed: Correct error message for invalid command.')
		}
	})
})
