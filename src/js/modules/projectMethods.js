
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import '../../../node_modules/swiper/swiper-bundle.min.css';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
    
Swiper.use([Navigation, Pagination, Autoplay]);
class ButtonPopup {
    constructor(element) {
        this.element = element;
        this.isAdd = true;
    }

    detectMob() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
        
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

    event() {
        let isMobile = this.detectMob();
        if (isMobile) {return}

        if (this.element.dataset.popupRight !== undefined) {
            let popup = new GeneratePopup(this.element);
            popup.popupRight();
        } else if (this.element.dataset.popupLeft !== undefined) {
            let popup = new GeneratePopup(this.element);
            popup.popupLeft();
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
        this.popupMargin = 10;
    }

    popupClassic() {
        this.popup.innerHTML = `<span>${this.element.dataset.popup}</span>`;
        let left = this.rect.left + this.element.clientWidth / 2 - this.popup.clientWidth / 2;
        let top = this.rect.top + this.rect.height + this.elementMargin;

        this.popup.style = `left: ${left}px; top: ${top}px`;

        window.addEventListener("scroll", () => {
            setTimeout(() => {
                let elementY = this.element.offsetTop;
                top = elementY + this.rect.height + this.elementMargin;
                this.popup.style = `left: ${left}px; top: ${top}px`;
            }, 100);
        });
    }

    popupRight() {
        this.popup.innerHTML = `<span>${this.element.dataset.popupRight}</span>`;
        this.popup.classList.add("right");
        let left = this.rect.left + this.element.clientWidth + this.popupMargin;
        let top = this.rect.top  + this.element.clientHeight / 2 - this.popup.clientHeight / 2;

        this.popup.style = `left: ${left}px; top: ${top}px`;
    }

    popupLeft() {
        this.popup.innerHTML = `<span>${this.element.dataset.popupLeft}</span>`;
        this.popup.classList.add("left");
        let left = this.rect.left - this.popupMargin - this.popup.clientWidth;
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
        this.articleContent = document.querySelector(".article-content");
        this.delta = 500;
        this.lastKeypressTime = 0;
    }

    headerScrollEvent() {
        if (!this.topButton) return;
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
        if (!this.header) return;
        let scroll = window.pageYOffset;
        const SCROLL_HEIGHT = 35;

        if (scroll > SCROLL_HEIGHT) {
            this.burgerMenuE.calcBurgerMenuPosition(70);
            this._constractHeader();
            this.burgerMenu.classList.add("scrolled");
            this.topButton.classList.remove("removed");
            if (this.articleContent) {this.articleContent.classList.add("scrolled")}
        } else {
            this.burgerMenuE.calcBurgerMenuPosition(115);
            this.header.classList.remove("scrolled");
            this.burgerMenu.classList.remove("scrolled");
            this.topButton.classList.add("removed");
            if (this.articleContent) {this.articleContent.classList.remove("scrolled")}
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
        this.selectInut = document.querySelectorAll(".bruger-menu_select-conteiner>input");
    }

    calcBurgerMenuPosition(num) {
        if (!this.pageHeader) return;
        let headerHeight = this.pageHeader.clientHeight;
        if (!isNaN(num)) {
            headerHeight = num;
        }
        this.burgerMenuCont.style = `transform: translateY(${headerHeight}px); height: calc(100dvh - ${headerHeight}px)`;
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

        let articleNavigation = new ArticleNavigation();
        articleNavigation.closeNav();
    }

    closeBurgerMenu() {
        this.burgerMenuCont.classList.remove("active");
        this.burgerMenuCont.classList.add("remove");
        this.#removeSelectOnCloseBurger();
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

    #removeSelectOnCloseBurger() {
        this.selectInut.forEach(element => element.checked = false);
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
            this.#addEventNotify();
        }
    }

    copyTextArticleButtonEvent() {
        let text = this.element.dataset.value;

        navigator.clipboard.writeText(text);
        if (this.isAddNotify) {
            this.#addEventNotify();
        }
    }

    #addEventNotify() {
        sessionStorage.setItem("isAddNotify", JSON.stringify(false));
        let text = "Текст скопирован в буфер обмена";

        if (this.element.classList.contains("call")) {
            text = "Телефон скопирован в буфер обмена";
        } else if (this.element.classList.contains("email")) {
            text = "Почта скопирована в буфер обмена";
        }


        let notify = document.createElement("div");
        notify.className = "buffer-notify";
        notify.innerHTML = `
        <span class="buffer-notify_icon">
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
                    style="fill:#ffffff;fill-opacity:0.87"
                    d="M 109.72995,445.90565 C 82.303128,440.3803 57.628738,419.7159 47.653468,393.91761 c -6.06732,-15.69147 -5.97473,-13.71468 -5.64903,-120.59719 l 0.29692,-97.43683 2.29378,-7.46134 c 8.79229,-28.60001 30.60165,-50.37684 58.568742,-58.48138 4.85355,-1.4065 9.67429,-2.55728 10.71277,-2.55728 1.83631,0 1.88821,2.3809 1.89095,86.75 0.002,57.10543 0.3797,89.82552 1.10572,95.75 3.41097,27.83438 13.6721,49.04228 33.39146,69.0141 14.83828,15.02826 28.21225,23.51079 46.5,29.49293 17.382,5.68586 21.97243,5.98059 93.25,5.98707 35.6125,0.003 64.75,0.24586 64.75,0.53914 0,0.29329 -1.17877,2.88079 -2.61949,5.75 -8.73204,17.39001 -25.70902,33.23492 -43.16322,40.28498 -15.42385,6.22997 -9.46786,5.88543 -105.21729,6.08655 -68.97153,0.14487 -88.88378,-0.095 -94.03483,-1.13271 z m 108.53483,-85.00683 c -34.15615,-6.54427 -60.33712,-31.78884 -68.32874,-65.88486 -1.50163,-6.40663 -1.67011,-16.97594 -1.65995,-104.13037 l 0.0113,-97 2.21641,-8 c 1.21903,-4.4 4.54832,-12.65852 7.39842,-18.35228 8.70822,-17.39679 24.84836,-32.388876 42.96491,-39.90882 14.68449,-6.095335 16.61406,-6.238896 83.85549,-6.238896 h 61.04216 l 0.0148,31.249996 c 0.0168,35.48218 0.47624,38.86677 7.16079,52.75 3.36355,6.98582 5.71651,10.1239 13.20852,17.61591 7.49201,7.49201 10.63009,9.84497 17.61591,13.20852 13.88557,6.68568 17.26418,7.14401 52.78616,7.16079 l 31.28616,0.0148 -0.3129,74.75 c -0.31055,74.18738 -0.3298,74.80506 -2.55768,82.065 -8.80932,28.7067 -29.97665,49.93325 -58.70174,58.86595 l -9,2.79874 -86,0.18837 c -68.39503,0.1498 -87.43296,-0.0862 -93,-1.15283 z M 404.05082,109.93284 c -10.21916,-3.19373 -18.49259,-10.49453 -23.15087,-20.42924 -2.61252,-5.57171 -2.63771,-5.8499 -2.93108,-32.37001 -0.16275,-14.712496 0.0643,-26.749996 0.50463,-26.749996 0.4403,0 19.02137,18.225 41.29128,40.499996 l 40.49074,40.5 -25.99537,-0.0669 c -18.53475,-0.0477 -27.20477,-0.44486 -30.20933,-1.38385 z"
                    id="path13714" />
            </g>
            </svg>
        </span>
        <span class="buffer-notify_text">
            ${text}
        </span>
        `

        document.body.append(notify);
        this.#appendToPage();
    }

    #appendToPage() {
        const ADD_DELAY = 80
        const REMOVE_ANIMATION_DELAY = 1000
        const ELEMENT_REMOVE_DELAY = 200
        new Promise((res, rej) => {
            let notifyElemet = document.querySelector(".buffer-notify");
            setTimeout(() => {
                let left = window.innerWidth / 2 - notifyElemet.clientWidth / 2 - 15;
                let top = window.innerHeight - notifyElemet.clientHeight - 30;
                notifyElemet.style = `left: ${left}px; top: ${top}px`;
                notifyElemet.classList.add("active")
                res(notifyElemet)
            }, ADD_DELAY)
        })
        .then((notifyElemet) => {
            new Promise((res, rej) => {
                setTimeout(() => {
                    notifyElemet.classList.add("remove");
                    res(notifyElemet);
                }, REMOVE_ANIMATION_DELAY)
            })
            .then((notifyElemet) => {
                setTimeout(() => {
                    notifyElemet.remove();
                    sessionStorage.setItem("isAddNotify", JSON.stringify(true));
                }, ELEMENT_REMOVE_DELAY)
            });
        })
    }
}


class NewsArticleFullscreen {
    constructor() {
        this.news = document.querySelector(".news");
        this.blur = document.querySelector(".page-blur");
        this.target = "";
        this.article = "";
    }

    fullscreenEvent() {
        if (!this.news || !this.blur) {
            return;
        }
        
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
            this.target.classList.add("article-remove-button");
            this.target.textContent = "Свернуть";

            document.body.style = "overflow: hidden;";
            let thisArticle = this.target.parentElement.parentElement;

            this.article = document.createElement("article");
            this.article.className = "news-article fullscreen"
            this.article.innerHTML = thisArticle.innerHTML;
            document.body.append(this.article);

            this.blur.classList.add("active");
            this.target.blur();
            this.target.classList.remove("article-remove-button");
            this.target.textContent = "Во весь экран";

            let articleRemove = document.querySelector(".article-remove-button");
            articleRemove.addEventListener("click", () => {
                this.removeFullscreenArticles();
            });
        }
    }

    removeFullscreenArticles() {
        let articleBlocks = document.querySelectorAll(".news-article");
        articleBlocks.forEach(element => {
            if (element.classList.contains("fullscreen")) {
                element.classList.add("remove");
                this.blur.classList.remove("active");
                setTimeout(() => {
                    document.body.style = ""
                    element.remove();
                }, 300);
            }
        });
    }
}

class ArticleNavigation {
    constructor() {
        this.articleLabels = document.querySelectorAll(".page-article>.article h2");
        this.linksConteiner = document.querySelector(".article-content_links");
        this.linksWrapper = document.querySelector(".article-content_wrapper");
        this.docVeiw = document.querySelector(".veiw-doc-button");
        this.conteiner = document.querySelector(".article-content");
    }

    articleDocInit() {
        if (this.linksConteiner) {
            this.articleLabels.forEach(element => {
                this.#refreshLabel(element);
                this.#generateLink(element);
            });
            window.addEventListener("scroll", () => {
                this.#changeLinkState();
                this.#findActiveLabel();
            });
            this.#changeLinkState();
            this.#veiwDocEvent();
            this.#generateLinksMark();
            this.#findActiveLabel();
            this.docVeiw.classList.add("set");
        }
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                try {
                    const yOffset = -100;
                    let element = document.querySelector(this.getAttribute('href'));
                    let yPos = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: yPos, behavior: 'smooth'});
                } catch {}
            });
        });
    }

    #refreshLabel(element) {
        const cyrillicToTranslit = new CyrillicToTranslit();
        let text = element.textContent;
        let transformedText = cyrillicToTranslit.transform(text, '_').toLowerCase();
        transformedText = transformedText.replaceAll('.', '_');
        transformedText = transformedText.replaceAll('/', '');
        transformedText = transformedText.replaceAll(',', '');
        transformedText = transformedText.replaceAll('(', '');
        transformedText = transformedText.replaceAll(')', '');
        transformedText = transformedText.replaceAll('"', '');
        transformedText = transformedText.replaceAll(`'`, '');
        element.id = transformedText;
        element.innerHTML = `
            <a href="#${transformedText}">${text}</a>
        `
    }

    #generateLink(element) {
        let link = document.createElement("a");
        link.textContent = element.textContent;
        link.href = `#${element.id}`;
        link.id = `${element.id}_nav`;
        link.className = "article-content_link";
        this.linksConteiner.append(link);
    }

    #changeLinkState() {
        const links = document.querySelectorAll('.article-content_link');
        const sections = document.querySelectorAll('.page-article>.article h2');

        let index = sections.length;
        const topicVeiwOnScreen = 0;

        while(--index && window.scrollY + topicVeiwOnScreen < sections[index].offsetTop) {}
        
        links.forEach((link) => link.classList.remove('active'));
        links[index].classList.add('active');

        let offestTop = links[index].offsetTop; 
        let linksSroll = 45;
        if (links[index-1]) {
            linksSroll += links[index-1].clientHeight;
            if (this.linksWrapper.clientHeight < (linksSroll + links[index].clientHeight)) {linksSroll = 45}
        }

        this.linksWrapper.scrollTop = offestTop - linksSroll;
    }

    #veiwDocEvent() {
        this.docVeiw.addEventListener("click", () => {
            this.conteiner.classList.contains("active") ? this.closeNav() : this.openNav();
        });
        window.addEventListener("resize", () => {
            if (window.innerWidth > 950) {
                this.closeNav()
            }
        });
        this.#docResiseEvent();
    }

    #docResiseEvent() {
        window.addEventListener("resize", () =>  {
            if (this.conteiner.classList.contains("active")) {
                this.docVeiw.style = `transform: translateY(-${this.conteiner.clientHeight}px); background-image: url("../img/icons/icons.svg#close-icon-${this.#getTheme()}");`;
            }
        });
     }

    #getTheme() {
        let theme = "light";
        const getCurrentTheme = () => JSON.parse(localStorage.getItem("theme"));
        switch (getCurrentTheme()){
            case "active":
                theme = "dark";
                break;
            case "sys":
                window.matchMedia("(prefers-color-scheme: dark)").matches ? theme = "dark" : void(0);
                break;
        }

        return theme;
    }

    #generateLinksMark() {
        let mark = document.createElement("span");
        mark.className = "article-content_links-mark";
        this.linksConteiner.append(mark);
    }

    #findActiveLabel() {
        let mark = document.querySelector(".article-content_links-mark");
        let links = document.querySelectorAll(".article-content_link");
        let positionY = 0;
        let height = 0
        links.forEach(element => {
            if (element.classList.contains("active")) {
                height = element.clientHeight;
                positionY = element.offsetTop;
                mark.style = `transform: translateY(${positionY + 10}px); height: ${height - 20}px;`
            }
        });
    }

    themeChangeNavOpend() {
        let isNavOpend = () => this.docVeiw.classList.contains("active");
        if (isNavOpend()) {
            this.docVeiw.style = `background-image: url("../img/icons/icons.svg#close-icon-${this.#getTheme()}");`;
        }
    }

    openNav() {
        if (!this.conteiner) {return}
        this.conteiner.classList.add("active");
        this.docVeiw.style = `transform: translateY(-${this.conteiner.clientHeight}px); background-image: url("../img/icons/icons.svg#close-icon-${this.#getTheme()}");`;
        this.docVeiw.innerText = "";
        this.docVeiw.dataset.popupLeft = "Закрыть";
        this.docVeiw.classList.add("active");
    }

    closeNav() {
        if (!this.conteiner) {return}
        this.conteiner.classList.remove("active");
        this.docVeiw.style = "";
        this.docVeiw.innerText = "§";
        this.docVeiw.dataset.popupLeft = "Показать содержание";
        this.docVeiw.classList.remove("active");
    }
}

class SetPageTheme {
    constructor() {
        this.themeButtons = document.querySelectorAll(".theme-button");
        this.themeMenuButton = document.querySelector(".theme-switch_active-menu");
        this.theme = JSON.parse(localStorage.getItem("theme"));
    }

    themeSelectEvent() {
        this.themeButtons.forEach(element => {
            element.addEventListener("click", () => {
                this.clearThemeSelect();
                element.classList.add("active");

                let mode = element.dataset.value;
                this.themeMenuButton.classList.add(`dark-theme-${mode}`);
                localStorage.setItem("theme", JSON.stringify(mode));

                this.setUpTheme(mode);

                let articleNav = new ArticleNavigation();
                articleNav.themeChangeNavOpend();
            });
        });
    }

    clearThemeSelect() {
        this.themeButtons.forEach(element => {
            element.classList.remove("active");
        });
        this.themeMenuButton.classList.remove("dark-theme-active", "dark-theme-auto", "dark-theme-disactive");
    }

    setUpTheme(theme) {
        switch(theme) {
            case "active":
                document.documentElement.classList.add("dark-theme");
                break
            case "sys":
                getAutoTheme();
                break
            case "disactive":
                document.documentElement.classList.remove("dark-theme");
                break
            default:
                getAutoTheme();
                localStorage.setItem("theme", JSON.stringify("sys"));
        }
    }
}

export class ButtonRippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll("button, .burger-menu_link, .news-history_link, .rasp a, .footer-content-social_link, .liceum1-info-link, .ege_link, .oge_link");
        this.button;
    }

    createRipple(event) {
        this.button = event.currentTarget;
        let circle = document.createElement("i");
        let diameter = Math.max(this.button.clientWidth, this.button.clientHeight);
        let radius = diameter / 2;
        let rect = this.button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - (rect.left + radius)}px`;
        circle.style.top = `${event.clientY - (rect.top + radius)}px`;
        circle.classList.add("ripple");

        if (diameter > 320) {
            circle.classList.add("blur400");
        } else if (320 >= diameter && diameter > 180) {
            circle.classList.add("blur200");
        } else if (180 >= diameter && diameter > 80) {
            circle.classList.add("blur100");
        } else {
            circle.classList.add("blur10");
        }

        this.removeRipple();
        this.button.appendChild(circle);
    }

    removeRipple() {
        let ripple = this.button.getElementsByClassName("ripple")[0];
        if (ripple) ripple.remove();
    }

    removeRippleVisible(event) {
        this.button = event.currentTarget;
        let children = this.button.children;
        [...children].forEach(element => {
            if (element.classList.contains("ripple")) element.classList.add("r-remove")
        });
    }

    rippleEvent() {
        this.buttons.forEach(element => {
            element.addEventListener("mousedown", (event) => {
                this.createRipple(event);
            });
            element.addEventListener("mouseup", (event) => {
                this.removeRippleVisible(event);
            });
            element.addEventListener("mouseout", (event) => {
                this.removeRippleVisible(event);
            });
        });
    }
}

export class InitPageNavigation {
    constructor() {
        this.path = window.location.pathname;
        this.sortcat = document.querySelector(".sortcat");
    }

    event() {
        if (!this.sortcat) {
            return;
        }

        let pageName = this.path.split("/").pop();
        let linksArr = [];
        try {
            linksArr = this.sortcat.children[0].innerHTML.split(" / ");
        } catch {
            linksArr = [];
        }
        let pageLabel = linksArr.pop();
        let contentlinks = "<a href=\"index.html\">Главная</a> / ";
        linksArr.forEach(element => {
            contentlinks += `${element} / `;
        });
        contentlinks += `<a href="${pageName}">${pageLabel}</a>`;

        this.sortcat.innerHTML = `
            <div class="links">${contentlinks}</div>
        `
    }
}

export class PageArticleParser {
    constructor() {
        this.paragraphs = document.querySelectorAll(".article p");
        this.imagesLandscapeFlag = false;
    }

    update() {
        this.#findImagesGroups();
    }

    articleImagesEvent() {
        window.addEventListener("load", () => {
            this.#findImagesGroups();
        });
    }

    #genereteImgLink(img, counter, element) {
        if (img.tagName === "IMG") {
            let pic = img.parentElement;
            let imgLink = document.createElement("a");
            imgLink.href = img.src;
            element.appendChild(imgLink);
            imgLink.appendChild(pic);
            let width = img.naturalWidth;
            let height = img.naturalHeight;
            if ((width < 50 || height < 50) && width && height){
                let aspect = width/height;
                let baseWidth = 1000;
                imgLink.dataset.pswpWidth = baseWidth;
                imgLink.dataset.pswpHeight = baseWidth/aspect;
            } else if (width && height) {
                imgLink.dataset.pswpWidth = width;
                imgLink.dataset.pswpHeight = height;
                let imgSrcOriginal = img.src.split("://")[1].split("/").slice(1).join("/");
                let imgSrc = `${imgSrcOriginal.split(".")[0]}-med`;
                let originalPath = imgSrcOriginal.split(".")[1];
                if (imgSrcOriginal.split(".").length > 2) throw new Error("Error: Ivnalid image or path name")
                pic.children[0].srcset = `${imgSrc}.webp`;
                pic.children[1].src = `${imgSrc}.${originalPath}`;
                element.appendChild(imgLink);
            }
            if (width/height >= 1) {
                this.imagesLandscapeFlag = true;
            }
            counter++
        }
        return counter;
    }
    #findImagesGroups() {
        this.paragraphs.forEach(element => {
            let imagesCounter = 0;
            if (![...element.children].some((element) => ["P", "SPAN", 'LI', 'UL', "OL"].includes(element.tagName))) {
                [...element.children].forEach(childE => {
                    let image = [...childE.children].slice(-1);
                    if (image.length) {
                        imagesCounter = this.#genereteImgLink(image[0], imagesCounter, element);
                    }
                });
            }

            if (imagesCounter >= 1) {
                const leftArrowSVGString = `<svg width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" /></svg>`;
                const rightArowSVGString = `<svg width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"/></svg>`
                const zoomSVGString = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.9992 21L14.9492 14.95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 10H14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 6V14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
                const closeSVGString = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"/>
                </svg>`;

                const lightbox = new PhotoSwipeLightbox({
                    arrowPrevSVG: leftArrowSVGString,
                    arrowNextSVG: rightArowSVGString,
                    zoomSVG: zoomSVGString,
                    closeSVG: closeSVGString,

                    gallery: element,
                    children: 'a',
                    pswpModule: () => import('photoswipe'),
                    wheelToZoom: true
                });
                lightbox.init();
                lightbox.on("openingAnimationStart", (e) => {
                    document.body.style = "overflow: hidden;";
                });
                lightbox.on("destroy", (e) => {
                    document.body.style = "";
                });
                imagesCounter > 1 ? element.className = "page-article_img-grid" : element.classList.add("page-article_one-img");
                element.classList.add("pswp-gallery");
                if (this.imagesLandscapeFlag) element.classList.add("pic")
            }
        });
    }
}

export { ButtonPopup, PageScroll, BurgerMenuEvents, TextCopy, NewsArticleFullscreen, ArticleNavigation, SetPageTheme }