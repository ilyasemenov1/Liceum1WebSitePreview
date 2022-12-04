
class ButtonPopup {
    constructor(element) {
        this.element = element;
        this.isAdd = true;
    }

    event() {
        if (this.element.dataset.popupRight !== undefined) {
            let popup = new GeneratePopup(this.element);
            popup.popupRight();
        } else if (this.element.dataset.popup !== undefined) {
            let popup = new GeneratePopup(this.element);
            popup.popupClassic();
        } 
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

class GeneratePopup {
    constructor(element) {
        this.element = element;
        this.rect = element.getBoundingClientRect();

        this.popup = document.createElement("div");
        this.popup.className = "button-popup";

        document.body.append(this.popup);

        this.elementMargin = 7;
    }

    popupClassic() {
        this.popup.innerHTML = `<span>${this.element.dataset.popup}</span>`;
        let left = this.rect.left + this.element.clientWidth / 2 - this.popup.clientWidth / 2;
        let top = this.rect.top + this.rect.height + this.elementMargin;

        this.popup.style = `left: ${left}px; top: ${top}px`;

        window.addEventListener("scroll", () => {
            setTimeout(() => {
                let elementY = this.element.offsetTop;
                top = elementY + this.rect.height + 7;
                this.popup.style = `left: ${left}px; top: ${top}px`;
            }, 100);
        });
    }

    popupRight() {
        this.popup.innerHTML = `<span>${this.element.dataset.popupRight}</span>`
        let left = this.rect.left + this.element.clientWidth + 10;
        let top = this.rect.top  + this.element.clientHeight / 2 - this.popup.clientHeight / 2;
        this.popup.classList.add("right");

        this.popup.style = `left: ${left}px; top: ${top}px`;
    }
}

class PageScroll {
    constructor() {
        this.header = document.querySelector(".header");
        this.burgerMenuE = new BurgerMenuEvents();
        this.burgerMenu = document.querySelector(".burger-menu");
        this.topButton = document.querySelector(".scroll-top");
    }

    headerScrollEvent() {
        window.addEventListener("scroll", () => {
            this._scroll();
        });
        window.addEventListener("load", () => {
            this._scroll();
        });
        this.topButton.addEventListener("click", () => {
            window.scrollTo({top: 0, behavior: 'smooth'}); 
        });
    }

    _scroll() {
        let scroll = window.pageYOffset;

        if (scroll > 35) {
            this.burgerMenuE.calcBurgerMenuPosition(70);
            this._constractHeader();
            this.burgerMenu.classList.add("scrolled");
            this.topButton.classList.remove("removed");
        } else {
            this.burgerMenuE.calcBurgerMenuPosition(115);
            this.header.classList.remove("scrolled");
            this.burgerMenu.classList.remove("scrolled");
            this.topButton.classList.add("removed");
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