
class ButtonPopup {
    constructor(element) {
        this.element = element;
        this.isAdd = true;
    }

    event() {
        if (this.element.dataset.popup === undefined) {
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
        popup.innerHTML = `<span>${this.element.dataset.popup}</span>`

        document.body.append(popup);

        //let triangle = document.querySelector(".triangle");
        //let triangleRect = triangle.getBoundingClientRect();
        let left = rect.left - popup.clientWidth / 2 + this.element.clientWidth / 2;
        let top = rect.top + rect.height + 7 + window.pageYOffset;

        //triangle.style = `left: ${popup.clientWidth / 2 - triangle.clientWidth - 5}px; top: ${-triangleRect.height-1}px`;
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

class PageScroll {
    constructor() {
        this.header = document.querySelector(".header");
    }

    headerScrollEvent() {
        window.addEventListener("scroll", () => {
            this._scroll();
        });
        window.addEventListener("load", () => {
            this._scroll();
        })
    }

    _scroll() {
        let scroll = window.pageYOffset;

        if (scroll > 35) {
            this._constractHeader();
        } else {
            this.header.classList.remove("scrolled");
        }
    }

    _constractHeader() {
        this.header.classList.add("scrolled");
    }

    _removeScrollHeader() {
        this.header.classList.remove("scrolled");
    }
}

export { ButtonPopup, PageScroll }