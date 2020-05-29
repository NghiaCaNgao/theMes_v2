const btnSave = document.getElementById("saveCssCode");
const txaCode = document.getElementById("code");
const body = document.getElementsByTagName("body")[0];
const style_mode = document.getElementById("style_mode");

getDataFromLocalStorage()
    .then(result => {
        body.style.backgroundImage = `url("${result.image_url}")`;
        txaCode.value = result.css;
        style_mode.value = result.style_mode;
    });

btnSave.addEventListener("click", function() {
    setCustomData({ css: txaCode.value });
});

style_mode.addEventListener("change", async function() {
    await setStyleMode(style_mode.value);
    getDataFromLocalStorage()
        .then(result => {
            console.log(result);
            body.style.backgroundImage = `url("${result.image_url}")`;
            txaCode.value = result.css;
        });
})