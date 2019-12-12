const COMMAND = {
  init: 'init',
  version: '-v, --version'
}

const { version } = require('../../package.json')

const description = 'generate a new project from a template'

module.exports = {
  COMMAND,
  description,
  version
}
