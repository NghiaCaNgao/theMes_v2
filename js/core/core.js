const getDataFromLocalStorage = function() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get((result) => {
            if (Object.keys(result).length != 0) {
                resolve(result);
            } else reject("undeclared");
        });
    });
}

function indexItem(arr, id) {
    let result = undefined;
    arr.forEach((element, index) => {
        if (element.id == id) {
            result = index;
        }
    });
    return result;
}

async function saveFriendById(url, id) {
    let GLOBAL_DATA = await getDataFromLocalStorage();
    let friends = GLOBAL_DATA.friends;
    let indexItem_;

    indexItem_ = indexItem(friends, id);
    if (indexItem_ != undefined) {
        friends[indexItem_] = {
            image_url: url,
            id: id
        }
    } else console.log("loi");
    setCustomData({ friends: friends });
}

async function deleteFriendById(id) {
    let GLOBAL_DATA = await getDataFromLocalStorage();
    let friends = GLOBAL_DATA.friends;
    let indexItem_;

    indexItem_ = indexItem(friends, id);
    if (indexItem_ != undefined) {
        friends.splice(indexItem_, 1);
    }
    setCustomData({ friends: friends });
}

async function getImageUrlFromId(id) {
    let GLOBAL_DATA = await getDataFromLocalStorage();
    let friends = GLOBAL_DATA.friends;
    let indexItem_;

    indexItem_ = indexItem(friends, id);
    if (indexItem_ != undefined) {
        return friends[indexItem_].image_url;
    } else return GLOBAL_DATA.image_url;
}

async function setDefaultData() {
    let GLOBAL_DATA = {
        image_url: "https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg",
        css: "._1enh._7q1s,._4_j5,._673w._6ynl{backdrop-filter:blur(10px);background:#ffffff5c;border-radius:10px;overflow-y:hidden}._6-xk{background-color:#fff}._1t2u._7sli{margin-left:10px;border:none;overflow:hidden}._20bp{margin-top:10px}._1ht3 ._1htf._6zke{background:#ff1493;border-radius:5px;padding:2px 5px;color:#fff}._1ht3 ._1ht6._7st9{background:salmon;border-radius:5px;padding:2px 5px;margin-bottom:5px;color:#fff}._1jt6._710_{padding:14px;background:#fff}._3tkv{padding-top:0!important}._4rv3._7og6{border-radius:5px;overflow:hidden}._5irm._7mkm{background-color:transparent!important}._7kpk{background-color:rgba(235,49,49,.42)!important}._1mf._1mj{color:#fff}._1htf{color:#fff!important}",
        ucss: "",
        friends: [],
        style_mode: "Light mode"
    }
    chrome.storage.sync.set(GLOBAL_DATA);
}

async function setStyleMode(mode) {
    let result = await getDataFromLocalStorage();
    result.style_mode = mode;
    [result.css, result.ucss] = [result.ucss, result.css];
    await setCustomData(result);
}

async function setCustomData(itemsChange) {
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
async function setFriendImage(url, id) {
    let GLOBAL_DATA = await getDataFromLocalStorage();
    let friends = GLOBAL_DATA.friends;
    let indexItem_;


    indexItem_ = indexItem(friends, id);
    if (indexItem_ != undefined) {
        friends[indexItem_] = {
            image_url: url,
            id: id
        };
    } else {
        friends.push({
            image_url: url,
            id: id
        });
    }
    await setCustomData({ friends: friends });
}