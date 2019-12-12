const downloadGit = require('download-git-repo')
const { templateHerf } = require('./config')

module.exports = function(projectName) {
  return new Promise((resolve, reject) => {
    downloadGit(
      `direct:${templateHerf}#master`,
      projectName,
      { clone: true },
      err => {
        if (err) reject(err)
        resolve()
      }
    )
  })
}
