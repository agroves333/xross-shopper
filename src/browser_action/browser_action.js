// placeholder for popup
chrome.storage.onChanged.addListener(function (changes,areaName) {
    console.log("New item in storage");
    console.log("New item in storage",changes.visitedPages.newValue);
});