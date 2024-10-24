let items = Array.from(document.getElementsByClassName("link"));
let links = document.getElementById("links");
links.setAttribute("data-rotate", "true");

for (const key in items) {
    if (Object.prototype.hasOwnProperty.call(items, key)) {
        const element = items[key];
        element.addEventListener('mouseover', startRotation);
        element.addEventListener('mousemove', followRotation);
        element.addEventListener('click', sendToPage)
        // element.addEventListener('mouseout', resetRotation);
    }
}

function sendToPage(event) {
    this.removeEventListener('mousemove', followRotation)
    this.style.transform = "rotate(10deg)"
    this.classList.add("clicked")
    setTimeout(() => {
        window.location.href = this.childNodes[0].getAttribute("href")
    }, 2000);
}

function startRotation(event) {
    let item = event.relatedTarget;
}

let match = null;
function followRotation(event) {
    let x = event.clientX;
    let y = event.clientY;
    let item = this;
    let itemCoords = item.getBoundingClientRect();
    let angle = Math.atan((y-(itemCoords.y+itemCoords.bottom)/2)/(x-itemCoords.x));
    angle = angle>0.084 ? 0.084 : angle;
    angle = angle<-0.084 ? -0.084 : angle;
    // item.style.transition = `transform 0s`;
    // let currTransform = item.style.transform ;
    // let currAngle = null;
    // const regex = /-*([0-9]*\.[0-9]*)/g;
    // match = currTransform.match(regex);
    // console.log(match[0])                       || for some reason this does not work
    item.style.transform = `rotate(${angle}rad)`;
    
}

function resetRotation(event) {
    for (const key in items) {
        if (Object.prototype.hasOwnProperty.call(items, key)) {
            const element = items[key];
            element.style.transform = "rotate(0deg)";
            element.style.transform = "rotate(0deg)";
        }
    }
}

function toggleRotation(event){
    resetRotation(event);
    let reset = document.getElementById("reset");
    if (links.getAttribute("data-rotate") == "true") {
        links.setAttribute("data-rotate", "false")
        reset.setAttribute("disabled", "");
        for (const key in items) {
            if (Object.prototype.hasOwnProperty.call(items, key)) {
                const element = items[key];
                element.removeEventListener('mouseover', startRotation);
                element.removeEventListener('mousemove', followRotation);
            }
        }
    } else {
        links.setAttribute("data-rotate", "true")
        reset.removeAttribute("disabled");
        for (const key in items) {
            if (Object.prototype.hasOwnProperty.call(items, key)) {
                const element = items[key];
                element.addEventListener('mouseover', startRotation);
                element.addEventListener('mousemove', followRotation);
                // element.addEventListener('mouseout', resetRotation);
            }
        }
    }
}