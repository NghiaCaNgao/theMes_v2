const inp_img = document.getElementById("inp_img");
const prv_img = document.getElementById("prv_img");
const style_mode = document.getElementById("style_mode");

async function initial() {
    getDataFromLocalStorage()
        .then((result) => {
            prv_img.src = result.image_url;
            inp_img.value = result.image_url;
            style_mode.value = result.style_mode;
        })
        .catch((reason) => {
            console.log(reason)
        });
}

style_mode.addEventListener("change", () => { setStyleMode(style_mode.value) })

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