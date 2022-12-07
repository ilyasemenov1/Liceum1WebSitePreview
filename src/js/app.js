import { ButtonPopup, PageScroll, BurgerMenuEvents } from "./modules/projectMetods.js";
import { isWebp } from "./modules/isWebpSupport.js";
import "./modules/pageSwiper.js";

isWebp();

class DocumentEvents {
    constructor() {
        this.buttons = document.querySelectorAll("button");
        this.nav = document.querySelector(".header-content_main-menu");
        this.searchCont = document.querySelector(".header-search");
        this.searchButton = document.querySelector(".search");
        this.searchInput = document.querySelector(".search-block_input");
        this.searchBlockAria = document.querySelector(".search-block-aria");
        this.isAddPopup = true;
        this.isCloseSearch = true;
        this.delay = 0;
        this.burgerMenuE = new BurgerMenuEvents();
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

    _addPopup(element, isFocus, hoverDelay=0) {
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
            }, hoverDelay);
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
        let menuDark = document.querySelector(".menu-conteiner_dark");

        menuDark.addEventListener("click", () => {
            this.burgerMenuE.closeBurgerMenu();
            burger.classList.remove("active");
        });

        burger.addEventListener("click", () => {
            if (burger.classList.contains("active")) {
                this.burgerMenuE.closeBurgerMenu();
            } else {
                this.burgerMenuE.openBurgerMenu();
            }
            burger.classList.toggle("active");
        });
    }

    searchEvent() {
        this.searchButton.addEventListener("click", () => {
            if (this.searchButton.classList.contains("search-active")) {
                //this.search();
            } else {
                this.openSearch();
            }
        });

        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 111) {
                this.openSearch();
                setTimeout(() => {
                    this.searchInput.focus();
                }, 300);
            }
        });

        window.addEventListener("load", () => {
            this.burgerMenuE.calcBurgerMenuPosition();
        });

        this.searchBlockAria.addEventListener("click", () => {
            this.closeSearch();
        });

        let searchBlock = document.querySelector(".search-block");
        this.searchInput.addEventListener("focus", () => {
            searchBlock.classList.add("active");
        });

        this.searchInput.addEventListener("blur", () => {
            searchBlock.classList.remove("active");
        });
    }

    openSearch() {
        this.nav.classList.add("remove");
        this.searchButton.blur();
        setTimeout(() => {
            this.searchButton.classList.add("search-active");
            this.nav.classList.remove("remove");
            this.nav.classList.add("disactive");
            this.searchCont.classList.remove("disactive");
            this.searchCont.classList.add("active");
            this.searchInput.focus();
            this.searchButton.dataset.popup = "Поиск";
            this.searchBlockAria.classList.remove("disactive");
        }, 200);
    }

    closeSearch() {
        this.searchCont.classList.add("remove");
        this.searchButton.blur();
        setTimeout(() => {
            this.searchButton.classList.remove("search-active");
            this.searchCont.classList.remove("remove");
            this.searchCont.classList.add("disactive");
            this.nav.classList.remove("disactive");
            this.nav.classList.add("active");
            this.searchButton.dataset.popup = "Открыть поиск";
            this.searchBlockAria.classList.add("disactive");
        }, 200);
    }
}

let pageScroll = new PageScroll();
let documentEvents = new DocumentEvents();
documentEvents.buttonsHoverEvent();
documentEvents.menuEvent();
documentEvents.searchEvent();
pageScroll.headerScrollEvent();