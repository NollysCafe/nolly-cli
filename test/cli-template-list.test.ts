import { execSync } from 'child_process'

describe('Template List Command Validation', () => {
	test('Displays available templates with list', () => {
		console.log('🚀 Starting test for list command...')
		const output = execSync('node dist/bin/index.js list', { stdio: 'pipe' }).toString()
		console.log('\n✅ CLI Output (List Command):\n', output)

		// Normalize the output by removing all non-alphanumeric characters except spaces
		const normalizedOutput = output
			.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{00A9}\u{00AE}\u{203C}\u{2049}\u{2122}\u{2139}\u{2194}\u{21A9}\u{21AA}\u{231A}-\u{231B}\u{2328}\u{23CF}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}\u{25AA}\u{25AB}\u{25FE}\u{2B06}\u{2195}\u{2196}\u{2197}\u{2198}\u{2B06}-\u{1F51E}\u{1F3F3}\u{1F4F0}]+/gu, '')
			.replace(/\s+/g, ' ')
			.trim()

		// Check for critical elements
		expect(normalizedOutput).toMatch(/Available Templates:/)
		expect(normalizedOutput).toMatch(/frontend/)
		expect(normalizedOutput).toMatch(/backend/)
		expect(normalizedOutput).toMatch(/fullstack/)
		expect(normalizedOutput).toMatch(/Use `create-nolly new <project-name> --type <template>`/)

		console.log('✅ Test passed: Templates displayed correctly with list command.')
	})
})
