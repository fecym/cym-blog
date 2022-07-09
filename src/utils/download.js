const downloadGit = require('download-git-repo')
const { templateHref } = require('./config')

module.exports = function(projectName) {
  return new Promise((resolve, reject) => {
    downloadGit(
      `direct:${templateHref}#master`,
      projectName,
      { clone: true },
      err => {
        if (err) reject(err)
        resolve()
      }
    )
  })
}
