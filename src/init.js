const program = require('commander')
const symbols = require('log-symbols')
const inquirer = require('inquirer')
const ora = require('ora')
const spinner = ora('downloading template ...')
const chalk = require('chalk')
const handlebars = require('handlebars')
const downloadGit = require('./utils/download')
const fs = require('fs')
const path = require('path')

const { COMMAND, description, version } = require('./utils/constant')
const init = () => {
  program
    .command(`${COMMAND.init} <name>`)
    .description(description)
    .action(name => {
      if (fs.existsSync(name)) {
        console.log(symbols.error, chalk.red('Error：项目已存在'))
        return process.exit(0)
      }
      inquirer.prompt([
        {
          name: 'author',
          message: '请输入作者姓名：'
        },
        {
          name: 'description',
          message: '请输入项目描述：'
        },
        {
          name: 'version',
          message: '请输入版本号：'
        }
      ]).then(answers => {
        spinner.start()
        downloadGit(name).then(_ => {
          spinner.succeed()
          // 处理元信息
          const meta = {
            name,
            description: answers.description,
            author: answers.author,
            version: answers.version
          }
          // 处理模板文件
          const templateName = path.resolve(__dirname, './utils/template.json')
          // 获取到一个 buffer 需要转字符串
          const templateContent = fs.readFileSync(templateName).toString()
          // 填充模板信息
          const result = handlebars.compile(templateContent)(meta)
          // 重写 package.json
          fs.writeFileSync(`${name}/package.json`, result)
          spinner.succeed()
          console.log(symbols.success, chalk.green('项目初始化完成'))
          console.log(symbols.success, chalk.green('执行以下命令运行您的项目'))
          console.log(symbols.info, chalk.green(`cd ${name}`))
<<<<<<< HEAD
          console.log(symbols.info, chalk.green(`yarn install`))
          console.log(symbols.info, chalk.green(`yarn start`))
=======
          console.log(symbols.info, chalk.green(`npm install && npm start`))
          console.log(symbols.info, chalk.green(`or`))
          console.log(symbols.info, chalk.green(`yarn install && yarn start`))
>>>>>>> fd5ff4e7b3d7ace43c2e042aa7264ca9c6b05409
          process.exit(0)
        }).catch(err => {
          spinner.fail()
          console.log(symbols.error, chalk.red(err))
          process.exit(0)
        })
      })
    })

    program.version(version, COMMAND.version).parse(process.argv)
}

module.exports = init
