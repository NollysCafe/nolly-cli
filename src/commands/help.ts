import chalk from 'chalk'

export const handleHelpCommand = () => {
  console.log(`
🌟 ${chalk.bold('Create Nolly CLI')}

${chalk.dim('A simple CLI tool for bootstrapping projects.')}

${chalk.bold('Usage:')}
  ${chalk.cyan('create-nolly')} ${chalk.dim('[options]')}

${chalk.bold('Options:')}
  ${chalk.green('--help, -h')}         Show this help message
  ${chalk.green('--version, -v')}      Show the CLI version
  ${chalk.green('new')}                Create a new project (supports flags: ${chalk.cyan('--type, --package-manager, --no-git, --no-install')})
  ${chalk.green('list')}               List all available templates
  ${chalk.green('clear-cache')}        Clear the CLI cache
  ${chalk.green('update')}             Update the CLI to the latest version

${chalk.bold('Links:')}
  ${chalk.blueBright('GitHub:')}       ${chalk.underline('https://github.com/thenolle')}
  ${chalk.blueBright('npm:')}          ${chalk.underline('https://npmjs.com/~nolly-cafe')}
  ${chalk.blueBright('Website:')}      ${chalk.underline('https://cafe.thenolle.com')}
  ${chalk.blueBright('Discord:')}      ${chalk.underline('https://discord.gg/T9eaXaVun6')}

Happy hacking! 🚀
`)
}
