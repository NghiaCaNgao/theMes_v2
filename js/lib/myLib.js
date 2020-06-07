function getId(url) {
    let parts = url.split("/");
    return parts[parts.length - 1];
}

function checkUrlLength(url) {
    if (url.length > 300) {
        alert("Url của ảnh quá dài");
        return 0;
    } else {
        return 1;
    }
}

async function isValidImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => reject("Invalid image url ");
    });
}

const notify = {
    basic: function(title, bodyText) {
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "assets/image/icon.png",
            title: title,
            message: bodyText
        })
    }
}


// single_button: function(title, bodyText, buttonText, func) {
//     chrome.notifications.create("single_button", {
//         type: "basic",
//         iconUrl: "assets/image/icon.png",
//         title: title,
//         message: bodyText,
//         buttons: [{
//             title: buttonText
//         }]
//     });
//     chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
//         if (notifId === "single_button") {
//             if (btnIdx === 0) { func }
//         }
//     });
// }