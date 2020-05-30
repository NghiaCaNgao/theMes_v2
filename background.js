async function setDefaultImage(url) {
    if (url.length > 300) {
        alert("Url của ảnh quá dài");
        return;
    }
    setCustomData({ image_url: url });
}
async function setPersonImage(url) {
    if (url.length > 300) {
        alert("Url của ảnh quá dài");
        return;
    }
    let userId = prompt("Id: ");
    if (!userId) return;

    setFriendImage(url, userId);
}
chrome.runtime.onInstalled.addListener((detail) => {
    if (detail.reason == "install") {
        setDefaultData();
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "icon.png",
            title: "Thanks for your installing",
            message: "Hãy thay đổi giao diện mesenger thôi"
        });
    } else if (detail.reason == "update") {
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "icon.png",
            title: "Thanks for your updating",
            message: "Hãy thay đổi giao diện mesenger thôi"
        });
    }
});

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    type: "normal",
    title: "Đặt làm nền mặc định",
    contexts: ["image"],
    id: "setDefaultImage"
});

chrome.contextMenus.create({
    type: "normal",
    title: "Đặt cho một người",
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
        if (changeInfo.status == "complete") {
            chrome.tabs.sendMessage(tabId, {
                command: 'uid',
                id: getId(tab.url)
            })
        }
    }
);