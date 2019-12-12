
const ora = require('ora')
const spinner = ora('downloading template ...')
const symbols = require('log-symbols')
const chalk = require('chalk')
const downloadFn = require('../src/utils/download')

const projectName = 'test-name'
// 项目开始下载
spinner.start()
downloadFn(projectName).then(_ => {
  spinner.succeed()
  console.log(symbols.success, chalk.green('下载成功'))
}).catch(err => {
  spinner.fail()
  console.log(symbols.error, chalk.red(err))
  process.exit(0)
})