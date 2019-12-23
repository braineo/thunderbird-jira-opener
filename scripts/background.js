const handleClick = () => {
  const onError = error => {
    console.log(`Error: ${error}`);
  };

  const onGot = options => {
    if (!options.jira_url || !options.project_key) {
      console.error("JIRA url or project key is not specified");
      return;
    }
    browser.tabs
      .query({
        active: true,
        currentWindow: true
      })
      .then(tabs => {
        let tabId = tabs[0].id;
        browser.messageDisplay
          // get current opened message header
          .getDisplayedMessage(tabId)
          .then(message => {
            // find messageId in message header
            return browser.messages.getFull(message.id);
          })
          .then(messagePart => {
            // search pattern e.g. [ABC-123]
            const regexPattern = new RegExp(`\\[${options.project_key}-\\d+\\]`);
            let result = iteratePartsForPattern(messagePart, regexPattern);
            result = result.filter(elem => !!elem);
            if (result.length > 1) {
              console.error(`found multiple matches ${result}`);
              return;
            } else if (result.length === 0) {
              console.error("no matches found");
              return;
            }
            const issueKey = result[0].slice(1, -1);
            browser.tabs.create({
              url: `${options.jira_url}/browse/${issueKey}`
            });
          });
      });
  };
  const getting = browser.storage.sync.get(["jira_url", "project_key"]);
  getting.then(onGot, onError);
};

const iteratePartsForPattern = (messagePart, regexPattern) => {
  let foundPatterns = [];
  if (messagePart.body) {
    // search for pattern in body
    let match = messagePart.body.match(regexPattern);
    if (!!match && match.length && match[0].length) {
      foundPatterns.push(match[0]);
    }
  }

  if (messagePart.parts && messagePart.parts.length > 0) {
    for (let _messagePart of messagePart.parts) {
      foundPatterns = foundPatterns.concat(
        iteratePartsForPattern(_messagePart, regexPattern)
      );
    }
  }
  return Array.from(new Set(foundPatterns));
};

browser.browserAction.onClicked.addListener(handleClick);
