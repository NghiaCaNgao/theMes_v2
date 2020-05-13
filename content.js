window.onload = function() {
    function setStyle(cssCode) {
        let style = document.createElement("style");
        let head = document.getElementsByTagName("head")[0];

        style.id = "css_theMes";
        style.innerHTML = cssCode;
        head.appendChild(style);
    }

    function setBackground(image_url) {
        let background = document.querySelector("._4sp8");
        background.style.backgroundImage = `url("${image_url}")`
    }

    function initial() {
        getDataFromLocalStorage()
            .then((result) => {
                // setBackground(result.image_url);
                setStyle(result.css);
            })
            .catch((reason) => {
                console.log(reason);
            });
    }

    chrome.runtime.onMessage.addListener(async function(request) {
        // console.log(request.command);
        switch (request.command) {
            case "uid":
                {
                    // console.log(request.id);
                    let image_url = await getImageUrlFromId(request.id);
                    // console.log(image_url);
                    setBackground(image_url);
                    break;
                }
            default:
                console.log("Error");
        }
    });

    initial();
}