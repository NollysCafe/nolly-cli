import { execSync } from 'child_process'

test('Fails when invalid template type is provided', () => {
	try {
		console.log('🚀 Starting test for invalid template type...')
		execSync('node dist/bin/index.js new test-project --type invalid-template', { stdio: 'pipe' }).toString()
	} catch (error: any) {
		console.log('\n✅ CLI Output (Invalid Template Type Test):\n', error.stderr?.toString())
		expect(error.stderr?.toString()).toContain('❌ Error: Invalid template type "invalid-template".')
		expect(error.stderr?.toString()).toContain('Valid types: frontend, backend, fullstack')
	}
})
