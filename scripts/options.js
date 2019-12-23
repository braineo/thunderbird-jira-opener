const saveOptions = e => {
  e.preventDefault();
  browser.storage.sync.set({
    jira_url: document.querySelector("#jira_url").value,
    project_key: document.querySelector("#project_key").value
  });
};

const restoreOptions = () => {
  const setCurrentChoice = result => {
    document.querySelector("#jira_url").value = result.jira_url || "";
    document.querySelector("#project_key").value = result.project_key || "";
  };

  const onError = error => {
    console.log(`Error: ${error}`);
  };

  var getting = browser.storage.sync.get(["jira_url", "project_key"]);
  getting.then(setCurrentChoice, onError);
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
