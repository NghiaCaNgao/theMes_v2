var background;
window.onload = function() {
    var GLOBAL_DATA = {};

    function getDataFromLocalStorage() {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get((result) => {
                if (result != {}) {
                    resolve(result);
                } else reject("undeclared");
            });
        });
    }

    function initial() {
        getDataFromLocalStorage()
            .then((result) => {
                GLOBAL_DATA = result;
                background = document.querySelector("._4sp8");
                background.style.backgroundImage = `url("${GLOBAL_DATA.image_url}")`
            })
            .catch((reason) => {
                console.log(reason);
            });
    }

    initial();
}