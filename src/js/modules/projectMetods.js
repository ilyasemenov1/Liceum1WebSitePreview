
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
        this.burgerMenuE = new BurgerMenuEvents();
        this.burgerMenu = document.querySelector(".burger-menu");
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
        this.burgerMenuE.calcBurgerMenuPosition();

        if (scroll > 35) {
            this.burgerMenuE.calcBurgerMenuPosition(70);
            this._constractHeader();
            this.burgerMenu.classList.add("scrolled");
        } else {
            this.burgerMenuE.calcBurgerMenuPosition(115);
            this.header.classList.remove("scrolled");
            this.burgerMenu.classList.remove("scrolled");
        }
    }

    _constractHeader() {
        this.header.classList.add("scrolled");
    }

    _removeScrollHeader() {
        this.header.classList.remove("scrolled");
    }
}

class BurgerMenuEvents {
    constructor() {
        this.burgerMenuCont = document.querySelector(".menu-conteiner");
        this.pageHeader = document.querySelector(".header");
    }

    calcBurgerMenuPosition(num) {
        let headerHeight = this.pageHeader.clientHeight;
        if (!isNaN(num)) {
            headerHeight = num;
        }
        this.burgerMenuCont.style = `transform: translateY(${headerHeight}px); height: calc(100vh - ${headerHeight}px)`;
    }

    openBurgerMenu() {
        this.burgerMenuCont.classList.remove("disactive");
        setTimeout(() => {
            this.burgerMenuCont.classList.add("active");
            document.body.style = `overflow:hidden;`;
        }, 10);
    }

    closeBurgerMenu() {
        this.burgerMenuCont.classList.remove("active");
        this.burgerMenuCont.classList.add("remove");
        setTimeout(() => {
            this.burgerMenuCont.classList.add("disactive");
            this.burgerMenuCont.classList.remove("remove");
            document.body.style = ``;
        }, 200);
    }
}

export { ButtonPopup, PageScroll, BurgerMenuEvents }