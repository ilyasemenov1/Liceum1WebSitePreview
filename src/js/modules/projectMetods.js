
class ButtonPopup {
    constructor(element) {
        this.element = element;
        this.isAdd = true;
    }

    event() {
        if (!isNaN(this.element.dataset.popup)) {
            return;
        }

        if (this.isAdd) {
            this._generatePopup();
        }
    }

    _generatePopup() {
        let rect = this.element.getBoundingClientRect();

        let popup = document.createElement("div");
        popup.className = "button-popup";
        popup.innerHTML = `
            <span>${this.element.dataset.popup}</span>
            <span class="triangle"></span>`

        document.body.append(popup);

        let triangle = document.querySelector(".triangle");
        let triangleRect = triangle.getBoundingClientRect();
        let left = rect.left - popup.clientWidth / 2 + this.element.clientWidth / 2;
        let top = rect.top + triangleRect.height  + rect.height + 5;

        triangle.style = `left: ${popup.clientWidth / 2 - triangle.clientWidth - 5}px; top: ${-triangleRect.height-1}px`;
        popup.style = `left: ${left}px; top: ${top}px`;
    }

    removePopup() {
        let popups = document.querySelectorAll(".button-popup");
        this.isAdd = false;
        popups.forEach(e => {
            e.classList.add("remove");
            setTimeout(() => {
                e.remove();
            }, 100);
        });
        setTimeout(() => {
            this.isAdd = true;
        }, 200);
    }
}

export { ButtonPopup }