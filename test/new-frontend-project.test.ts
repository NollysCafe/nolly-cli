import fs from 'fs'
import { execSync } from 'child_process'

const testProjectName = 'test-project'

const removeProject = (projectName: string) => {
	if (fs.existsSync(projectName)) {
		fs.rmSync(projectName, { recursive: true, force: true })
	}
}

afterEach(() => {
	console.log(`🧹 Cleaning up project folder "${testProjectName}"`)
	removeProject(testProjectName)
})

test('Create a new frontend project folder successfully', () => {
	console.log('🚀 Starting test for creating a new frontend project...')
	const output = execSync('node dist/bin/index.js new test-project --type frontend', { stdio: 'pipe' }).toString()
	console.log('\n✅ CLI Output (Success):\n', output)

	expect(output).toContain('🎉 Project "test-project" created successfully with the "frontend" template!')
	expect(fs.existsSync('./test-project')).toBeTruthy()
	expect(fs.existsSync('./test-project/src/App.tsx')).toBeTruthy()
	console.log('✅ Test passed: New frontend project folder created successfully.')
})
