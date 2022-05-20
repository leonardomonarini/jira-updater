const _ = require('lodash')
const Jira = require('./common/net/Jira')

module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const { argv } = this

    const issueId = argv.issue
    const fixVersions = argv.fixVersions

    await this.Jira.updateIssueFixVersions(issueId, fixVersions)

    console.log(`Updated ${issueId} fixVersions field to: ${fixVersions}`)

    return {}
  }
}
