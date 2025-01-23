import fs from 'fs'
import { execSync } from 'child_process'

const removeProject = (projectName: string) => {
	if (fs.existsSync(projectName)) {
		fs.rmSync(projectName, { recursive: true, force: true })
	}
}

afterEach(() => {
	console.log(`🧹 Cleaning up project folder "frontend"`)
	removeProject('frontend')
})

test('Fails when no project name is provided', () => {
	console.log('🚀 Starting test for missing project name...')
	try {
		execSync('node dist/bin/index.js new --type frontend', { stdio: 'pipe' }).toString()
	} catch (error: any) {
		console.log('\n✅ CLI Output (No Project Name Test):\n', error.stderr?.toString())
		expect(error.stderr?.toString()).toContain('❌ Error: Please specify a project name.')
		console.log('✅ Test passed: Correct error message for missing project name.')
	}
})
