const getDataFromLocalStorage = function() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get((result) => {
            if (Object.keys(result).length != 0) {
                resolve(result);
            } else reject("undeclared");
        });
    });
}

async function getImageUrlFromId(id) {
    let GLOBAL_DATA = await getDataFromLocalStorage();
    let friends = GLOBAL_DATA.friends;

    for (let element of friends) {
        if (element.id == id) {
            return element.image_url;
        }
    }
    return GLOBAL_DATA.image_url;
}

const setDefaultData = function() {
    let GLOBAL_DATA = {
        image_url: "https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg",
        css: "._1enh._7q1s,._4_j5,._673w._6ynl{backdrop-filter:blur(10px);background:#ffffff5c;border-radius:10px;overflow-y:hidden}._6-xk{background-color:#fff}._1t2u._7sli{margin-left:10px;border:none;overflow:hidden}._20bp{margin-top:10px}._1ht3 ._1htf._6zke{background:#ff1493;border-radius:5px;padding:2px 5px;color:#fff}._1ht3 ._1ht6._7st9{background:salmon;border-radius:5px;padding:2px 5px;margin-bottom:5px;color:#fff}._1jt6._710_{padding:14px;background:#fff}._3tkv{padding-top:0!important}._4rv3._7og6{border-radius:5px;overflow:hidden}._5irm._7mkm{background-color:transparent!important}._7kpk{background-color:rgba(235,49,49,.42)!important}._1mf._1mj{color:#fff}._1htf{color:#fff!important}",
        friends: []
    }
    chrome.storage.sync.set(GLOBAL_DATA);
}

const setCustomData = async function(itemsChange) {
    let GLOBAL_DATA = await getDataFromLocalStorage();

    for (let key in GLOBAL_DATA) {
        for (let item in itemsChange) {
            if (key == item) {
                GLOBAL_DATA[key] = itemsChange[key];
            }
        }
    }
    chrome.storage.sync.set(GLOBAL_DATA);
}
const setFriendImage = async function(url, id) {
    let GLOBAL_DATA = await getDataFromLocalStorage();
    let friends = GLOBAL_DATA.friends;

    friends.push({
        image_url: url,
        id: id
    });
    setCustomData({ friends: friends });
}

const isValidImage = function(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => reject("Invalid url image");
    });
}