const inp_img = document.getElementById("inp_img");
const prv_img = document.getElementById("prv_img");

var GLOBAL_DATA = {};

function getDataFromLocalStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get((result) => {
            if (Object.keys(result).length != 0) {
                resolve(result);
            } else reject("undeclared");
        });
    });
}

function setDefaultData() {
    GLOBAL_DATA = {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-oaHgm4S1og3e3fm8URuWubjdCrYIdgxC4pgqoChBXm4krQiV&usqp=CAU"
    }
    chrome.storage.sync.set(GLOBAL_DATA);
}

function setCustomData(itemsChange) {
    for (let key in GLOBAL_DATA) {
        for (let item in itemsChange) {
            if (key == item) {
                GLOBAL_DATA[key] = itemsChange[key];
            }
        }
    }
    chrome.storage.sync.set(GLOBAL_DATA);
}



function isValidImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => reject("Invalid url image");
    });
}

async function initial() {
    getDataFromLocalStorage()
        .then((result) => {
            GLOBAL_DATA = result;
            prv_img.src = result.image_url;
            inp_img.value = result.image_url;
        })
        .catch((reason) => {
            console.log(reason)
            setDefaultData();
            prv_img.src = GLOBAL_DATA.image_url;
            inp_img.value = GLOBAL_DATA.image_url;
        });
}
inp_img.onchange = async function() {
    isValidImage(this.value)
        .then((response) => {
            prv_img.src = this.value;
            setCustomData({ image_url: this.value });

            //css
            inp_img.style.boxShadow = "1px 1px 7px #f0f0f0";
            inp_img.style.border = "none";
        })
        .catch(response => {

            //css
            inp_img.style.boxShadow = "1px 1px 7px #d9828e";
            inp_img.style.border = "#d9828e 2px solid";
        })
}

initial();