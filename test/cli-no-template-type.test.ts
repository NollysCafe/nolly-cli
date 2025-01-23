import { execSync } from 'child_process'

test('Fails when no template type is provided', () => {
	console.log('🚀 Starting test for missing template type...')
	try {
		execSync('node dist/bin/index.js new test-project', { stdio: 'pipe' }).toString()
	} catch (error: any) {
		console.log('\n✅ CLI Output (No Template Type Test):\n', error.stderr?.toString())
		expect(error.stderr?.toString()).toContain('❌ Error: Please specify a valid template type.')
		console.log('✅ Test passed: Correct error message for missing template type.')
	}
})
