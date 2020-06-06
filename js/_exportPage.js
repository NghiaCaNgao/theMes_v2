const body = document.getElementsByTagName("body")[0];
const code = document.getElementById("code");
const btn_style = document.getElementById("btn_style");
const btn_set = document.getElementById("btn_set");
const btn_save = document.getElementById("btn_save");
const btn_restore = document.getElementById("btn_restore");

function isValid(obj1, obj2) {
    if (typeof(obj1) == "object" && typeof(obj2) == "object") {
        let o1 = Object.keys(obj1).toString();
        let o2 = Object.keys(obj2).toString();
        if (o1 == o2) { return true } else false;
    } else return false;
}

btn_restore.addEventListener("click", async function() {
    let ok = await confirm("Khôi phục cài đặt gốc?");
    if (ok) {
        setDefaultData();
    }
});

btn_style.addEventListener("click", async function() {
    getDataFromLocalStorage()
        .then(result => {
            delete result.friends;
            window.navigator.clipboard.writeText(JSON.stringify(result))
        })
});

btn_set.addEventListener("click", function() {
    getDataFromLocalStorage()
        .then(result => {
            window.navigator.clipboard.writeText(JSON.stringify(result))
        });
});

btn_save.addEventListener("click", async function() {
    let local = await getDataFromLocalStorage();
    try {
        let user_setting = JSON.parse(code.value);
        let = JSON.parse(code.value);
        if (isValid(local, user_setting)) {
            alert("Success!")
            setCustomData(user_setting);
        } else throw new Error("key is not valid");
    } catch (error) {
        console.log(error);
        alert("Wrong input. For more info about the errors, please press Ctrl + Shift + I");
    }
});

function init() {
    getDataFromLocalStorage()
        .then(result => {
            body.style.backgroundImage = `url("${result.image_url}")`
            code.value = JSON.stringify(result);
        });
}

init();