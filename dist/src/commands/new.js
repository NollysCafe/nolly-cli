import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { readCache } from '../utils/cache.js';
import { execSync } from 'child_process';
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_KEY = 'templates';
const validTemplates = readCache(CACHE_KEY, Infinity) || [{ name: 'frontend' }, { name: 'backend' }, { name: 'fullstack' }];
const validPackageManagers = ['npm', 'yarn', 'pnpm'];
export const handleNewCommand = async (args) => {
    try {
        // Parse project name and template type
        let projectName = args[0];
        const typeArgIndex = args.findIndex(arg => arg === '--type');
        let templateType = typeArgIndex >= 0 ? args[typeArgIndex + 1] : null;
        const packageManagerIndex = args.findIndex(arg => arg === '--package-manager');
        let packageManager = packageManagerIndex >= 0 ? args[packageManagerIndex + 1] : null;
        const noInitGit = args.findIndex(arg => arg === '--no-git') >= 0;
        const noInstall = args.findIndex(arg => arg === '--no-install') >= 0;
        // Interactive prompt for project name if missing
        if (!projectName) {
            const { name } = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: 'What is your project name?',
                validate: input => input.trim() !== '' || 'Project name cannot be empty.',
            });
            projectName = name;
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
            console.error(chalk.red(`❌ Error: Invalid project name "${projectName}".`));
            console.log(chalk.cyan('Project name must be alphanumeric and can contain hyphens and underscores.'));
            return;
        }
        // Interactive prompt for template type if missing
        if (!templateType) {
            const { template } = await inquirer.prompt({
                type: 'list',
                name: 'template',
                message: 'Choose a project template:',
                choices: validTemplates.map(template => ({
                    name: template.name,
                    value: template.name,
                }))
            });
            templateType = template;
        }
        if (!validTemplates.some(template => template.name === templateType || '')) {
            console.error(chalk.red(`❌ Error: Invalid template type "${templateType}".`));
            console.log(chalk.cyan(`Valid types: ${validTemplates.map(template => template.name).join(', ')}`));
            return;
        }
        // Interactive prompt for package manager if missing
        if (!packageManager) {
            const { manager } = await inquirer.prompt({
                type: 'list',
                name: 'manager',
                message: 'Choose a package manager:',
                choices: validPackageManagers.map(manager => ({
                    name: manager,
                    value: manager,
                }))
            });
            packageManager = manager;
        }
        if (!validPackageManagers.includes(packageManager || '')) {
            console.error(chalk.red(`❌ Error: Invalid package manager "${packageManager}".`));
            console.log(chalk.cyan(`Valid managers: ${validPackageManagers.join(', ')}`));
            return;
        }
        const targetDir = path.resolve(process.cwd(), projectName);
        // Check if the project folder already exists
        if (fs.existsSync(targetDir)) {
            console.error(chalk.red(`❌ Error: Directory "${projectName}" already exists.`));
            process.exit(1);
        }
        // Resolve template directory
        const templateDir = path.resolve(__dirname, '../../../templates', templateType);
        if (!fs.existsSync(templateDir)) {
            console.error(chalk.red(`❌ Error: Template "${templateType}" not found.`));
            process.exit(1);
        }
        // Create project folder and copy template files
        fs.mkdirSync(targetDir, { recursive: true });
        fs.cpSync(templateDir, targetDir, { recursive: true });
        // Save configuration to a project-specific file
        const configPath = path.resolve(targetDir, '.nollyrc.json');
        const projectConfig = {
            packageManager,
            template: templateType,
            createdAt: new Date().toISOString(),
            cliVersion: process.env.VERSION
        };
        fs.writeFileSync(configPath, JSON.stringify(projectConfig, null, 2), 'utf-8');
        // Log success message
        console.log(chalk.green(`🎉 Project "${projectName}" created successfully with the "${templateType}" template!`));
        console.log(chalk.cyan(`📦 Using package manager: ${packageManager}`));
        console.log(chalk.cyan(`📂 Navigate to your project folder:\n  cd ${projectName}`));
        // Interactive prompt for installing dependencies
        if (!noInstall) {
            const { installDependencies } = await inquirer.prompt({
                type: 'confirm',
                name: 'installDependencies',
                message: 'Would you like to install dependencies now?',
                default: true,
            });
            if (installDependencies) {
                process.chdir(targetDir);
                try {
                    console.log(chalk.cyan(`📦 Installing dependencies with ${packageManager}...`));
                    execSync(`${packageManager} install`, { cwd: targetDir, stdio: 'inherit' });
                    console.log(chalk.green('✅ Dependencies installed successfully.'));
                }
                catch (error) {
                    console.error(chalk.red(`❌ Error: Dependencies could not be installed. ${error.message}`));
                }
            }
        }
        // Interactive prompt for initializing Git repository
        if (!noInitGit) {
            const { initializeGit } = await inquirer.prompt({
                type: 'confirm',
                name: 'initializeGit',
                message: 'Would you like to initialize a Git repository?',
                default: true,
            });
            if (initializeGit) {
                process.chdir(targetDir);
                try {
                    execSync('git init', { stdio: 'ignore' });
                    console.log(chalk.green('✅ Git repository initialized successfully.'));
                    const gitignoreContent = `# Node.js\nnode_modules\npnpm-lock.yaml\nyarn.lock\npackage-lock.json\n\n# Editor\n.vscode\n.idea\n\n# macOS\n.DS_Store\n\n# Build\nbuild\ndist\n`;
                    fs.writeFileSync(path.resolve(targetDir, '.gitignore'), gitignoreContent, 'utf-8');
                    console.log(chalk.green('📄 Created a default .gitignore file.'));
                }
                catch (error) {
                    console.error(chalk.red(`❌ Error: Git repository could not be initialized. ${error.message}`));
                }
            }
        }
    }
    catch (error) {
        if (error.isTtyError) {
            console.error(chalk.red('❌ Error: Prompt could not be rendered in the current environment.'));
        }
        else if (error.name === 'ExitPromptError') {
            console.log(chalk.yellow('⚠️ Operation canceled by the user. Exiting gracefully.'));
        }
        else {
            console.error(chalk.red(`❌ Unexpected error: ${error.message}`));
        }
        process.exit(0);
    }
};
//# sourceMappingURL=new.js.map