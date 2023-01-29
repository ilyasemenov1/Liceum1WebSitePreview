import { ButtonPopup, PageScroll, BurgerMenuEvents, TextCopy, NewsArticleFullscreen, ArticleNavigation } from "./modules/projectMetods.js";
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
        this.searchClose = document.querySelectorAll(".header-search_close-button");
        this.searchBlock = document.querySelector(".search-block");
        this.clearButton = document.querySelector(".search-block_clear-button");
        this.isAddPopup = true;
        this.isCloseSearch = true;
        this.delay = 0;
        this.burgerMenuE = new BurgerMenuEvents();
        sessionStorage.setItem("isAddNotify", JSON.stringify(true));
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
            this.openSearch();
        });

        window.addEventListener("keydown", (event) => {
            setTimeout(() => {
                switch (event.keyCode) {
                    case 111:
                    case 191:
                        this.openSearch();
                        setTimeout(() => {
                            this.searchInput.focus();
                        }, 300);
                        break
                    case 27:
                        this.closeSearch();
                        break
                }
            }, 50)
        });

        window.addEventListener("load", () => {
            this.burgerMenuE.calcBurgerMenuPosition();
        });

        this.searchClose.forEach(element => {
            element.addEventListener("click", () => {
                this.closeSearch();
            });
        });

        this.searchBlockAria.addEventListener("click", () => {
            this.closeSearch();
        });

        this.searchInput.addEventListener("focus", () => {
            this.isSearch();
        });

        this.searchInput.addEventListener("blur", () => {
            this.searchBlock.classList.remove("active");
        });

        this.searchInput.addEventListener("input", () => {
            this.isSearch();
        });

        this.clearButton.addEventListener("click", () => {
            this.searchInput.value = "";
        });
    }

    isSearch() {
        return this.searchInput.value ? this.searchBlock.classList.add("active") : this.searchBlock.classList.remove("active");
    }

    openSearch() {
        this.searchButton.blur();
        this.searchCont.classList.remove("disactive");
        this.searchCont.classList.add("active");
        this.searchInput.focus();
        this.searchBlockAria.classList.remove("disactive");
        document.body.style = "overflow: hidden;";
    }

    closeSearch() {
        this.searchCont.classList.add("remove");
        this.searchButton.blur();
        setTimeout(() => {            
            this.searchCont.classList.remove("remove");
            this.searchCont.classList.add("disactive");
        document.body.style = "overflow: visible;";
        }, 200);
    }

    bufferEvent() {
        let buttons = document.querySelectorAll(".liceum1-info_text-copy, .map_adress-copy");
        buttons.forEach(element => {
            element.addEventListener("click", () => {
                let copyText = new TextCopy(element);
                copyText.copyTextButtonEvent()
            });
        });
    }
}

let pageScroll = new PageScroll();
let documentEvents = new DocumentEvents();
let fullscreen = new NewsArticleFullscreen();
let articleNavigation = new ArticleNavigation();
documentEvents.buttonsHoverEvent();
documentEvents.menuEvent();
documentEvents.searchEvent();
documentEvents.bufferEvent();
pageScroll.headerScrollEvent();
fullscreen.fullscreenEvent();
articleNavigation.articleDocInit();