const btnSave = document.getElementById("saveCssCode");
const txaCode = document.getElementById("code");

getDataFromLocalStorage()
    .then(result => {
        txaCode.value = result.css;
    });

btnSave.addEventListener("click", function() {
    setCustomData({ css: txaCode.value });
});