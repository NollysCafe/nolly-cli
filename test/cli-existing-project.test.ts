import fs from 'fs'
import { execSync } from 'child_process'

const existingProjectName = 'existing-project'

beforeAll(() => {
	console.log('🛠️ Setting up existing project folder for testing...')
	if (fs.existsSync(existingProjectName)) {
		fs.rmSync(existingProjectName, { recursive: true, force: true })
	}
	fs.mkdirSync(existingProjectName)
})

afterAll(() => {
	console.log(`🧹 Cleaning up existing project folder "${existingProjectName}"`)
	if (fs.existsSync(existingProjectName)) {
		fs.rmSync(existingProjectName, { recursive: true, force: true })
	}
})

test('Fails when project folder already exists', () => {
	console.log('🚀 Starting test for existing project folder...')
	try {
		execSync(`node dist/bin/index.js new ${existingProjectName} --type backend`, { stdio: 'pipe' }).toString()
	} catch (error: any) {
		console.log('\n✅ CLI Output (Existing Project Test):\n', error.stderr?.toString())
		expect(error.stderr?.toString()).toContain(`❌ Error: Directory "${existingProjectName}" already exists.`)
		console.log('✅ Test passed: Correct error message for existing project folder.')
	}
})
