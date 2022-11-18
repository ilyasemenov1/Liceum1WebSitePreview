import { ButtonPopup, PageScroll } from "./modules/projectMetods.js";
import { isWebp } from "./modules/isWebpSupport.js";

isWebp();

class DocumentEvents {
    constructor() {
        this.buttons = document.querySelectorAll("button");
        this.isAddPopup = true;
        this.delay = 0;
    }

    buttonsHoverEvent() {
        this.buttons.forEach(element => {
            element.addEventListener("mouseover", () => {
                this._addPopup(element, false);
            });
            element.addEventListener("focus", () => {
                this._addPopup(element, true);
            });
            element.addEventListener("mouseleave", () => {
                this._removePopup(element);
            });
            element.addEventListener("blur", () => {
                this._removePopup(element);
            });
        });

    }

    _addPopup(element, isFocus) {
        if (!this.isAddPopup) {
            return;
        }
        if (isFocus) {
            let popup = new ButtonPopup(element);
            popup.event();
        } else {
            this.delay = setTimeout(() => {
                let popup = new ButtonPopup(element);
                popup.event();
            }, 300);
        }
        this.isAddPopup = false;
    }

    _removePopup(element) {
        clearTimeout(this.delay);
        let popup = new ButtonPopup(element);
        popup.removePopup();
        this.isAddPopup = true;
    }

    menuEvent() {
        let burger = document.querySelector(".burger");

        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
        });
    }
}

let pageScroll = new PageScroll();
let documentEvents = new DocumentEvents();
documentEvents.buttonsHoverEvent();
documentEvents.menuEvent();
pageScroll.headerScrollEvent();