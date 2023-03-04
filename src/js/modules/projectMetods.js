
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import '../../../node_modules/swiper/swiper-bundle.min.css';
    
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
        
    }

    #addEventNotify() {
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
            this.#appendToPage();
        }, 80);
    }

    #appendToPage() {
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
        this.articleLabels = document.querySelectorAll(".page-article_topic-label");
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
                window.addEventListener("scroll", () => {
                    this.#changeLinkState();
                });
            });
            this.#changeLinkState();
            this.#veiwDocEvent();
            this.docVeiw.classList.add("set");
        }
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                const yOffset = -100;
                let element = document.querySelector(this.getAttribute('href'));
                let yPos = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: yPos, behavior: 'smooth'});
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
        const sections = document.querySelectorAll('.page-article_topic-label');

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
            if (window.innerWidth > 768) {
                this.closeNav()
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
            case "auto":
                window.matchMedia("(prefers-color-scheme: dark)").matches ? theme = "dark" : void(0);
                break;
        }

        return theme;
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
            case "auto":
                getAutoTheme();
                break
            case "disactive":
                document.documentElement.classList.remove("dark-theme");
                break
            default:
                getAutoTheme();
                localStorage.setItem("theme", JSON.stringify("auto"));
        }
    }
}

class InitFullscreenSwiper {
    constructor(swiper) {
        this.imgContainers = document.querySelectorAll(".page-article_img-grid");
        this.target, this.container;
        this.swiperWrapper = document.querySelector(".fullscreen-swiper_wrapper");
        this.swiperContainer = document.querySelector(".fullscreen-swiper");
        this.swiperRemoveButton = document.querySelector(".fullscreen-swiper-navigation_close-button");
        this.counter = document.querySelector(".fullscreen-swiper-navigation_slides-counter");
        this.slideIndex = swiper.activeIndex;
        this.swiper = swiper;
    }

    initSwiper() {
        this.slideGenerateEvent();
        this.swiperRemoveEvent();
    }

    sildeNumEvent() {
        let slides = document.querySelectorAll(".fullscreen-swiper_wrapper>div");
        this.counter.innerText = `${this.slideIndex+1}/${slides.length}`;
    }

    swiperRemoveEvent() {
        this.swiperRemoveButton.addEventListener("click", () => {
            this.removeSwiper();
        });
    }

    removeSwiper() {
        this.swiperContainer.classList.remove("active");
        document.body.style = "overflow: visivle;";
        setTimeout(() => {
            this.swiperWrapper.innerHTML = "";
        }, 200);
    }

    slideGenerateEvent() {
        this.imgContainers.forEach(element => {
            element.addEventListener("click", (event) => {
                this.swiperContainer.classList.add("active");
                document.body.style = "overflow: hidden;";
                this.target = event.target;
                this.container = element;
                let conteinerChildren = this.container.children;
                for (let i = 0; i < conteinerChildren.length; i++) {
                    let img  = conteinerChildren.item(i).innerHTML;
                    let slide = `
                    <div class="swiper-slide fullscreen-swiper_slide">
                        <div class="swiper-zoom-container">${img}</div>
                    </div>`;
                    this.swiperWrapper.innerHTML += slide;
                }
                this.sildeNumEvent();
                this.findTargetImgIdex();
            });
        });
    }
    
    findTargetImgIdex() {
        if (this.target.src) {
            let buttons = document.querySelectorAll(".page-article_img-button");
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].children[0].children[1].src == this.target.src) {
                    this.swiper.slideTo(i);
                }
            }
        }
    }
}

export { ButtonPopup, PageScroll, BurgerMenuEvents, TextCopy, NewsArticleFullscreen, ArticleNavigation, SetPageTheme, InitFullscreenSwiper }