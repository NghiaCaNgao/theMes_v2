async function setDefaultImage(url) {
    if (url.length > 300) {
        alert("Too long url");
        return;
    }
    setCustomData({ image_url: url });
}
async function setPersonImage(url) {
    if (url.length > 300) {
        alert("Too long url");
        return;
    }
    let userId = prompt("Enter your friend id: ");
    if (!userId) return;

    setFriendImage(url, userId);
}
chrome.runtime.onInstalled.addListener((detail) => {
    if (detail.reason == "install") {
        setDefaultData();
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "icon.png",
            title: "Thank for your installing",
            message: "Let change your Messenger's appearance now"
        });
    } else if (detail.reason == "update") {
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "icon.png",
            title: "Thank for your updating",
            message: "Let change your Messenger's appearance now"
        });
    }
});

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    type: "normal",
    title: "Set Messenger's background",
    contexts: ["image"],
    id: "setDefaultImage"
});

chrome.contextMenus.create({
    type: "normal",
    title: "Set for special person",
    contexts: ["image"],
    id: "setPersonImage"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "setDefaultImage") setDefaultImage(info.srcUrl);
    if (info.menuItemId == "setPersonImage") setPersonImage(info.srcUrl);
});

function getId(url) {
    let parts = url.split("/");
    return parts[parts.length - 1];
}

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        // console.log(changeInfo);
        if (changeInfo.status == "complete") {
            chrome.tabs.sendMessage(tabId, {
                command: 'uid',
                id: getId(tab.url)
            })
        }
    }
);