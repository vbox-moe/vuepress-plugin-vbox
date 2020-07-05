import chalk = require('chalk')

function info(msg: string, data?: string) {
  console.log(`${chalk.blue('info')} ${msg} ${data ? chalk.magenta(data) : ''}`)
}

function warn(msg: string, data?: string) {
  console.log(
    `${chalk.yellow('err')} ${msg} ${data ? chalk.magenta(data) : ''}`
  )
}

function err(msg: string, data?: string) {
  console.log(`${chalk.red('err')} ${msg} ${data ? chalk.magenta(data) : ''}`)
}

function success(msg: string, data?: string) {
  console.log(
    `${chalk.green('success')} ${msg} ${data ? chalk.magenta(data) : ''}`
  )
}

export { info, warn, err, success }
