# Jira Updater
Update Jira issue

> ##### Only supports Jira Cloud. Does not support Jira Server (hosted)

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

Example update action:

```yaml
- name: Update issue
  id: update
  uses: fernandezafb/jira-updater@master
  with:
    issue: GA-181
    fixVersions: "17.5.0"
```

The `issue` parameter can be an issue id created or retrieved by an upstream action – for example, [`Create`](https://github.com/marketplace/actions/jira-create) or [`Find Issue Key`](https://github.com/marketplace/actions/jira-find). Here is full example workflow:

```yaml
on:
  push

name: Test Update Issue

jobs:
  test-transition-issue:
    name: Update Issue
    runs-on: ubuntu-latest
    steps:
    - name: Login
      uses: atlassian/gajira-login@master
      env:
        JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
        JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
        JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}
        
    - name: Create new issue
      id: create
      uses: atlassian/gajira-create@master

    - name: Update issue
      uses: atlassian/gajira-transition@master
      with:
        issue: ${{ steps.create.outputs.issue }}
        fixVersions: "17.5.0"
```
----
## Action Spec:

### Environment variables
- None

### Inputs
- `issue` (required) - issue key to perform a transition on
- `fixVersions` (required) - the fixVersions to update the issue with

### Outputs
- None

### Reads fields from config file at $HOME/jira/config.yml
- `issue`
- `fixVersions`

### Writes fields to config file at $HOME/jira/config.yml
- None