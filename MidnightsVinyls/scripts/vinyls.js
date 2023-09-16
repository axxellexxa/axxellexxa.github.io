let covers = document.querySelectorAll(".album-container")

function toggle(i) {
    if (i.className.includes("left")) {
        i.className = "album-container flipright";
        setTimeout(() => {
            i.className = "album-container right"
        }, 1000);
    } else if (i.className.includes("right")) {
        i.className = "album-container flipleft";
        setTimeout(() => {
            i.className = "album-container left"
        }, 1000);
    }
}

for (let i = 0; i < covers.length; i++) {
    covers[i].addEventListener("click", function(){toggle(covers[i])});
}