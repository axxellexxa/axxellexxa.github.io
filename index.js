let items = Array.from(document.getElementsByClassName("link"));

for (const key in items) {
    if (Object.prototype.hasOwnProperty.call(items, key)) {
        const element = items[key];
        element.addEventListener('mouseover', startRotation);
        element.addEventListener('mousemove', followRotation);
        // element.addEventListener('mouseout', resetRotation);
        element.setAttribute("data-index", key)
    }
}

function startRotation(event) {
    let item = event.relatedTarget;
}

function followRotation(event) {
    let x = event.clientX;
    let y = event.clientY;
    let item = document.elementFromPoint(x,y);
    if (
        items.includes(item)
    ) {
        let itemCoords = item.getBoundingClientRect();
        let angle = Math.atan((y-(itemCoords.y+itemCoords.bottom)/2)/(x-itemCoords.x));
        angle = angle>0.08 ? 0.08 : angle;
        angle = angle<-0.08 ? -0.08 : angle;
        item.style.transition = `transform 0s`;
        item.style.transform = `rotate(${angle}rad)`;
    }
}

function resetRotation(event) {
    let item = event.relatedTarget;
    // item.style.transition = `transform 2s`;
    item.style.transform = `rotate(0rad)`;
}