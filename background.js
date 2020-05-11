function getDataFromLocalStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get((result) => {
            if (result != {}) {
                resolve(result);
            } else reject("undeclared");
        });
    });
}

function setDefaultData() {
    chrome.storage.sync.set({ image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-oaHgm4S1og3e3fm8URuWubjdCrYIdgxC4pgqoChBXm4krQiV&usqp=CAU" });
}


function setCustomData(CUSTOM_GLOBAL_DATA, itemsChange) {
    for (let key in CUSTOM_GLOBAL_DATA) {
        for (let item in itemsChange) {
            if (key == item) {
                CUSTOM_GLOBAL_DATA[key] = itemsChange[key];
            }
        }
    }
    chrome.storage.sync.set(CUSTOM_GLOBAL_DATA);
}

async function setImage(url) {
    if (url.length > 300) {
        alert("Too long url");
        return;
    }
    getDataFromLocalStorage()
        .then((result) => {
            setCustomData(result, { image_url: url })
        })
}
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    type: "normal",
    title: "Select this image to set Messenger's background",
    contexts: ["image"],
    id: "saveImage"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log(info);
    console.log(tab);
    if (info.menuItemId == "saveImage") setImage(info.srcUrl)
});