import { BurgerMenuEvents, ButtonPopup, TextCopy } from "./projectMetods.js";

export class DocumentEvents {
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
        this.#bufferEventAdd(".liceum1-info_text-copy, .map_adress-copy", "mainPage");
        this.#bufferEventAdd("button.copy", "article");
    }

    isElementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;
      
        while(el.offsetParent) {
          el = el.offsetParent;
          top += el.offsetTop;
          left += el.offsetLeft;
        }
      
        return (
          top >= window.pageYOffset &&
          left >= window.pageXOffset &&
          (top + height) <= (window.pageYOffset + window.innerHeight) &&
          (left + width) <= (window.pageXOffset + window.innerWidth)
        );
      }

    #bufferEventAdd(className, type) {
        let buttons = document.querySelectorAll(className);
        buttons.forEach(element => {
            let copy_icon = document.createElement("span");
            copy_icon.className = "copy_icon";
            copy_icon.innerHTML = `
            <svg
                version="1.1"
                id="svg13224"
                width="425.95273"
                height="425.69327"
                viewBox="0 0 425.95273 425.69327"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg">
            <defs id="defs13228" />
            <g
                id="g13230"
                transform="translate(-41.884396,-21.383595)">
                <path
                    d="M 109.72995,445.90565 C 82.303128,440.3803 57.628738,419.7159 47.653468,393.91761 c -6.06732,-15.69147 -5.97473,-13.71468 -5.64903,-120.59719 l 0.29692,-97.43683 2.29378,-7.46134 c 8.79229,-28.60001 30.60165,-50.37684 58.568742,-58.48138 4.85355,-1.4065 9.67429,-2.55728 10.71277,-2.55728 1.83631,0 1.88821,2.3809 1.89095,86.75 0.002,57.10543 0.3797,89.82552 1.10572,95.75 3.41097,27.83438 13.6721,49.04228 33.39146,69.0141 14.83828,15.02826 28.21225,23.51079 46.5,29.49293 17.382,5.68586 21.97243,5.98059 93.25,5.98707 35.6125,0.003 64.75,0.24586 64.75,0.53914 0,0.29329 -1.17877,2.88079 -2.61949,5.75 -8.73204,17.39001 -25.70902,33.23492 -43.16322,40.28498 -15.42385,6.22997 -9.46786,5.88543 -105.21729,6.08655 -68.97153,0.14487 -88.88378,-0.095 -94.03483,-1.13271 z m 108.53483,-85.00683 c -34.15615,-6.54427 -60.33712,-31.78884 -68.32874,-65.88486 -1.50163,-6.40663 -1.67011,-16.97594 -1.65995,-104.13037 l 0.0113,-97 2.21641,-8 c 1.21903,-4.4 4.54832,-12.65852 7.39842,-18.35228 8.70822,-17.39679 24.84836,-32.388876 42.96491,-39.90882 14.68449,-6.095335 16.61406,-6.238896 83.85549,-6.238896 h 61.04216 l 0.0148,31.249996 c 0.0168,35.48218 0.47624,38.86677 7.16079,52.75 3.36355,6.98582 5.71651,10.1239 13.20852,17.61591 7.49201,7.49201 10.63009,9.84497 17.61591,13.20852 13.88557,6.68568 17.26418,7.14401 52.78616,7.16079 l 31.28616,0.0148 -0.3129,74.75 c -0.31055,74.18738 -0.3298,74.80506 -2.55768,82.065 -8.80932,28.7067 -29.97665,49.93325 -58.70174,58.86595 l -9,2.79874 -86,0.18837 c -68.39503,0.1498 -87.43296,-0.0862 -93,-1.15283 z M 404.05082,109.93284 c -10.21916,-3.19373 -18.49259,-10.49453 -23.15087,-20.42924 -2.61252,-5.57171 -2.63771,-5.8499 -2.93108,-32.37001 -0.16275,-14.712496 0.0643,-26.749996 0.50463,-26.749996 0.4403,0 19.02137,18.225 41.29128,40.499996 l 40.49074,40.5 -25.99537,-0.0669 c -18.53475,-0.0477 -27.20477,-0.44486 -30.20933,-1.38385 z"
                    id="path13714" />
            </g>
            </svg>
            `
            element.appendChild(copy_icon);
            element.addEventListener("click", () => {
                let copyText = new TextCopy(element);
                if (type == "mainPage") {
                    copyText.copyTextButtonEvent();
                } else if (type == "article") {
                    copyText.copyTextArticleButtonEvent();
                }
            });
        });
    }
}