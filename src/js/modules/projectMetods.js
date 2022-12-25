
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
        this.popup.innerHTML = `<span>${this.element.dataset.popupRight}</span>`;
        this.popup.classList.add("right");
        let left = this.rect.left + this.element.clientWidth + 10;
        let top = this.rect.top  + this.element.clientHeight / 2 - this.popup.clientHeight / 2;

        this.popup.style = `left: ${left}px; top: ${top}px`;
    }
}

class PageScroll {
    constructor() {
        this.header = document.querySelector(".header");
        this.burgerMenuE = new BurgerMenuEvents();
        this.burgerMenu = document.querySelector(".burger-menu");
        this.topButton = document.querySelector(".scroll-top");
        this.delta = 500;
        this.lastKeypressTime = 0;
    }

    headerScrollEvent() {
        window.addEventListener("scroll", () => {
            this.scroll();
        });
        window.addEventListener("load", () => {
            this.scroll();
        });
        this.topButton.addEventListener("click", () => {
            window.scrollTo({top: 0, behavior: 'smooth'}); 
        });
        window.addEventListener("keydown", (event) => {
            this.doubleArrowKeypress(event);
        });
    }

    doubleArrowKeypress(event) {
        switch(event.key){
            case "ArrowUp":
                this.doubleKeyEvent(
                    function() {window.scrollTo({top: 0, behavior: 'smooth'})}
                );
                break;
            case "ArrowDown":
                this.doubleKeyEvent(
                    function() {window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}
                );
                break; 
        }
    }

    doubleKeyEvent(callback) {
        let thisKeypressTime = new Date();
        if (thisKeypressTime - this.lastKeypressTime <= this.delta ) {
            callback(); 
            thisKeypressTime = 0;
        }
        this.lastKeypressTime = thisKeypressTime;
    }

    scroll() {
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
        this.pageFixedButtons = document.querySelectorAll(".scroll-top, .visually-impaired-version");
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
        this.pageFixedButtons.forEach(element => {
            element.classList.add("removed");
        });
    }

    closeBurgerMenu() {
        this.burgerMenuCont.classList.remove("active");
        this.burgerMenuCont.classList.add("remove");
        setTimeout(() => {
            this.burgerMenuCont.classList.add("disactive");
            this.burgerMenuCont.classList.remove("remove");
            document.body.style = ``;
            this.pageFixedButtons.forEach(element => {
                element.classList.remove("removed");
                let scroll = new PageScroll();
                scroll.scroll();
            });
        }, 200);
    }
}

class TextCopy {
    constructor(element) {
        this.element = element;
        this.isAddNotify = JSON.parse(sessionStorage.getItem("isAddNotify"));
    }

    copyTextButtonEvent() {
        let inputId = this.element.dataset.id;
        let input = document.getElementById(inputId);
        if (!input) { 
            throw Error("input id and element id don't match")
        }

        input.select();
        input.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(input.value);
        if (this.isAddNotify) {
            this._addEventNotify();
        }
    }

    _addEventNotify() {
        sessionStorage.setItem("isAddNotify", JSON.stringify(false));
        let text = "Текст скопирован в буфер обмена";

        if (this.element.classList.contains("call")) {
            text = "Телефон скопирован в буфер обмена";
        } else if (this.element.classList.contains("email")) {
            text = "Почта скопирована в буфер обмена";
        }


        let notify = document.createElement("span");
        notify.className = "buffer-notify";
        notify.textContent = text;

        document.body.append(notify);

        setTimeout(() => {
            this._appendToPage();
        }, 80);
    }

    _appendToPage() {
        let notify_e = document.querySelector(".buffer-notify");

        let left = window.innerWidth / 2 - notify_e.clientWidth / 2 - 15;
        let top = window.innerHeight - notify_e.clientHeight - 30;
        notify_e.style = `left: ${left}px; top: ${top}px`;
        notify_e.classList.add("active")

        setTimeout(() => {
            notify_e.classList.add("remove");
            setTimeout(() => {
                notify_e.remove();
                sessionStorage.setItem("isAddNotify", JSON.stringify(true));
            }, 200)
        }, 1000);
    }
}


class NewsArticleFullscreen {
    constructor() {
        this.news = document.querySelector(".news");
        this.blur = document.querySelector(".page-blur");
        this.articleBlocks = document.querySelectorAll(".news-article");
        this.target = "";
        this.article = "";
    }

    fullscreenEvent() {
        this.news.addEventListener("click", (event) => {
            this._event(event);
        });
        this.blur.addEventListener("click", () => {
            this.removeFullscreenArticles();
        });
    }

    _event(event) {
        this.target = event.target;

        if (this.target.classList.contains("news-article_fullscreen")) {
            document.body.style = "overflow: hidden;"
            this.article = this.target.parentElement.parentElement;
            this.article.classList.add("fullscreen");
            this.blur.classList.add("active");
        }
    }

    removeFullscreenArticles() {
        this.articleBlocks.forEach(element => {
            if (element.classList.contains("fullscreen")) {
                element.classList.add("remove");
                this.blur.classList.remove("active");
                setTimeout(() => {
                    document.body.style = ""
                    element.classList.remove("remove", "fullscreen");
                }, 300);
            }
        });
    }
}

export { ButtonPopup, PageScroll, BurgerMenuEvents, TextCopy, NewsArticleFullscreen }