## Thunderbird add-on opens JIRA issue page by searching issue key in mail

This add-on creates a tool bar button and search for pattern of `[ABC-123]` in your email. If it finds one match, it will open JIRA page for you.

If does not work for

* Multiple issue key in email
* Encrypted email

### Getting started

1. Download `jira-opener.zip` from [release](https://github.com/braineo/thunderbird-jira-opener/releases)
2. Open Add-ons manager from `Tools` -> `Add-ons`
3. Click gear icon and `Install Add-on from file`
4. Select the zip file downloaded in step 1
5. Agree on permissions
6. Click Perference of this add-on and fill JIRA URL something like `http://jira.example.com` (without the last slash) and project key. If issue keys are like `ABC-123`, then fill in `ABC`
