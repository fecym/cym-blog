const program = require('commander')
const symbols = require('log-symbols')
const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')

const { COMMAND, description, version } = require('../src/utils/constant')

program
  .command(`${COMMAND.init} <name>`)
  .description(description)
  .action(name => {
    if (fs.existsSync(name)) {
      console.log(symbols.error, chalk.red('Error：项目已存在'))
      return process.exit(0)
    }
    inquirer
      .prompt([
        {
          name: 'description',
          message: '请输入博客描述：'
        },
        {
          name: 'author',
          message: '请输入作者姓名：'
        }
      ])
      .then(answers => {
        console.log(answers)
        console.log(symbols.info, chalk.green(`npm install && npm start`))
        console.log(symbols.info, chalk.green(`or`))
        console.log(symbols.info, chalk.green(`yarn install && yarn start`))
    })
  })

program.version(version, COMMAND.version).parse(process.argv)
