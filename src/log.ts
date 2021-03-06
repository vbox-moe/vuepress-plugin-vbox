import chalk = require('chalk')

function info(msg: string = '', data: string = '', suffix: string = '') {
  console.log(`${chalk.blue('info')} ${msg} ${chalk.magenta(data)} ${suffix}`)
}

function warn(msg: string = '', data: string = '', suffix: string = '') {
  console.log(`${chalk.yellow('err')} ${msg} ${chalk.magenta(data)} ${suffix}`)
}

function err(msg: string = '', data: string = '', suffix: string = '') {
  console.log(`${chalk.red('err')} ${msg} ${chalk.magenta(data)} ${suffix}`)
}

function success(msg: string = '', data: string = '', suffix: string = '') {
  console.log(
    `${chalk.green('success')} ${msg} ${chalk.magenta(data)} ${suffix}`
  )
}

export { info, warn, err, success }
