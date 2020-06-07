async function setDefaultImage(url) {
    if (checkUrlLength(url)) {
        setCustomData({ image_url: url });
    }
}
async function setPersonImage(url) {
    if (checkUrlLength(url)) {
        let userId = prompt("Id: ");
        if (!userId) return;
        setFriendImage(url, userId);
    }
}

chrome.runtime.onInstalled.addListener((detail) => {
    if (detail.reason == "install") {
        setDefaultData();
        notify.basic("Thanks for your installing", "Thay đổi thôi");
    } else if (detail.reason == "update") {
        notify.basic("Thanks for your updating", "Cảm ơn bạn đã tin dùng sản phẩm của btteam");
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