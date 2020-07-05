import chalk = require('chalk')

function info(msg: string) {
  console.log(`${chalk.blue('info')} ${msg}`)
}

function err(msg: string) {
  console.log(`${chalk.red('err')} ${msg}`)
}

function success(msg: string) {
  console.log(`${chalk.green('success')} ${msg}`)
}

export { info, err, success }
