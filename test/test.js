const program = require('commander')
const symbols = require('log-symbols')
const fs = require('fs')
program
  .command(`init <option>`)
  .action(option => {
    console.log(option)
  })
// 切记一定要 parse 到 process.argv 否则项目都无法测试
program.version('1.0.0', '-v, --version').parse(process.argv)