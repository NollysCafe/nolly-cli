import fs from 'fs'
import path from 'path'

describe('Template Directory Check', () => {
	const templateDir = path.resolve(__dirname, '../templates')

	test('Templates directory exists', () => {
		console.log('🚀 Checking if templates directory exists...')
		expect(fs.existsSync(templateDir)).toBeTruthy()
	})

	test('Frontend template exists', () => {
		console.log('🚀 Checking if frontend template exists...')
		expect(fs.existsSync(path.join(templateDir, 'frontend'))).toBeTruthy()
	})

	test('Backend template exists', () => {
		console.log('🚀 Checking if backend template exists...')
		expect(fs.existsSync(path.join(templateDir, 'backend'))).toBeTruthy()
	})

	test('Fullstack template exists', () => {
		console.log('🚀 Checking if fullstack template exists...')
		expect(fs.existsSync(path.join(templateDir, 'fullstack'))).toBeTruthy()
	})
})
