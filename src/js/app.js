import { ButtonPopup } from "./modules/projectMetods.js";
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
                this._addPopup(element);
            });
            element.addEventListener("focus", () => {
                this._addPopup(element);
            });
            element.addEventListener("mouseleave", () => {
                this._removePopup(element);
            });
            element.addEventListener("blur", () => {
                this._removePopup(element);
            });
        });

    }

    _addPopup(element) {
        this.delay = setTimeout(() => {
            let popup = new ButtonPopup(element);
            popup.event();
        }, 300);
    }

    _removePopup(element) {
        clearTimeout(this.delay);
        let popup = new ButtonPopup(element);
        popup.removePopup();
    }
}

let documentEvents = new DocumentEvents();
documentEvents.buttonsHoverEvent()