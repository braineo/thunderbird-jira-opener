// Below is what we'll log to the console.

console.log("Hello, World! - from popup.js");
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
        let result = iteratePartsForPattern(messagePart, /\[\d+\]/);
        if (result.length > 1) {
          console.error(`found multiple matches ${result}`);
        } else if (result.length === 0) {
          console.error("no matches found");
        }
        document.body.textContent = result[0];
      });
  });

const iteratePartsForPattern = (messagePart, regexPattern) => {
  let foundPatterns = [];
  if (messagePart.body) {
    // search for pattern in body
    let match = messagePart.body.match(regexPattern);
    if (match.length && match[0].length) {
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
