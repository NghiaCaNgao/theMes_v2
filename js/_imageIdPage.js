const wrap = document.getElementById("wrap");
const btn_add = document.getElementById("btn_add")
const inp_uid = document.getElementById("uid")
const inp_url = document.getElementById("url");
const body = document.getElementsByTagName("body")[0];

function getData() {
    getDataFromLocalStorage()
        .then(result => {
            wrap.innerHTML = "";
            result.friends.forEach((element) => {
                creatPanel(element);
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function searchData(id) {
    getDataFromLocalStorage()
        .then(result => {
            wrap.innerHTML = "";
            result.friends.forEach((element) => {
                if (element.id.indexOf(id) > -1) {
                    creatPanel(element);
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function encryptId(id) {
    return id.replace(/[.\,]/ig, "_");
}

function deleteFriendId(id) {
    let panel = document.getElementById(id);
    panel.parentNode.removeChild(panel);
    deleteFriendById(id);
}

function saveFriendId(id) {
    let image_url = document.querySelector(`#${encryptId(id)} .img_url`).value;
    console.log(image_url);
    saveFriendById(image_url, id)
}

function creatPanel(element) {
    let panel = document.createElement("div");
    let userId = document.createElement("input");
    let image_url = document.createElement("input");
    let tool = document.createElement("div");
    let btn_delete = document.createElement("button");
    let btn_save = document.createElement("button");

    userId.type = "text";
    userId.value = element.id;
    userId.readOnly = true;
    image_url.type = "text";
    image_url.value = element.image_url;
    image_url.classList.add("img_url");

    tool.classList.add("tool", "d-flex", "justify-content-between");
    btn_delete.classList.add("red");
    btn_delete.addEventListener("click", () => { deleteFriendId(element.id) });

    btn_delete.innerHTML = '<i class="fas fa-minus-circle"></i>';
    btn_save.classList.add("blue");
    btn_save.innerHTML = '<i class="fas fa-save"></i>';
    btn_save.addEventListener("click", () => { saveFriendId(element.id) });

    panel.classList.add("p-3", "container", "d-flex", "panel", "justify-content-around");
    panel.id = encryptId(element.id);


    tool.appendChild(btn_delete);
    tool.appendChild(btn_save);

    panel.appendChild(userId);
    panel.appendChild(image_url);
    panel.appendChild(tool);

    wrap.appendChild(panel);
}

btn_add.addEventListener("click", async function() {
    let uid = inp_uid.value.trim();
    let url = inp_url.value.trim();
    inp_uid.value = "";
    inp_url.value = "";

    if (uid != "" && url != "") {
        await setFriendImage(url, uid);
        await getData();
    }
});

inp_uid.addEventListener("keyup", function(key) {
    console.log(key);
    if (key.key != "Enter") {
        if (inp_uid.value.trim() == "") {
            getData();
        } else {
            searchData(inp_uid.value.trim());
        }
    }
})

function init() {
    getDataFromLocalStorage()
        .then(result => {
            body.style.backgroundImage = `url("${result.image_url}")`
        });
    getData();
}

init();