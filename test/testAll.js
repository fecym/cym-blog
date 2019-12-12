const program = require('commander')
const symbols = require('log-symbols')
const inquirer = require('inquirer')
const ora = require('ora')
const spinner = ora('downloading template ...')
const chalk = require('chalk')
const handlebars = require('handlebars')
const downloadGit = require('../src/utils/download')
const fs = require('fs')
const path = require('path')

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
          message: '请输入项目描述：'
        },
        {
          name: 'author',
          message: '请输入作者姓名：'
        }
      ])
      .then(answers => {
        console.log(answers)
        spinner.start()
        downloadGit(name)
          .then(_ => {
            spinner.succeed()
            // 处理元信息
            const meta = {
              name,
              description: answers.description,
              author: answers.author
            }
            // 处理模板文件
            const templateName = path.resolve(
              __dirname,
              '../src/utils/template.json'
            )
            // 获取到一个 buffer 需要转字符串
            const templateContent = fs.readFileSync(templateName).toString()
            // 填充模板信息
            const result = handlebars.compile(templateContent)(meta)
            // 重写 package.json
            fs.writeFileSync(`${name}/package.json`, result)
            spinner.succeed()
            console.log(symbols.success, chalk.green('项目初始化完成'))
            console.log(
              symbols.success,
              chalk.green('执行以下命令运行您的项目')
            )
            console.log(symbols.info, chalk.green(`cd ${name}`))
            console.log(symbols.info, chalk.green(`npm install`))
            console.log(symbols.info, chalk.green(`npm start`))
            process.exit(0)
          })
          .catch(err => {
            spinner.fail()
            console.log(symbols.error, chalk.red(err))
            process.exit(0)
          })
      })
  })

program.version(version, COMMAND.version).parse(process.argv)
