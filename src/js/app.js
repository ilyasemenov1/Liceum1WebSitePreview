import { PageScroll, NewsArticleFullscreen, ArticleNavigation, SetPageTheme, ButtonRippleEffect, InitPageNavigation, PageArticleParser } from "./modules/projectMethods.js";
import { DocumentEvents } from "./modules/documentEvents.js";
import { isWebp } from "./modules/isWebpSupport.js";
import { cookiesEvents } from "./modules/cookies.js";
import "./modules/pageSwiper.js";
import "./modules/maps.js";
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';

hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('javascript', javascript);
hljs.highlightAll();

import LazyLoad from "vanilla-lazyload";
const lazyLoadInstance = new LazyLoad({
    callback_error: (img) => {
        img.setAttribute("src", "img/fallback.webp");
        let parent = img.parentElement;
        [...parent.children].forEach(element => {
            let tag = element.tagName;
            tag === "SOURCE" ? element.remove() : void(0)
        });
      }
});
lazyLoadInstance.update();

isWebp();
cookiesEvents();

class InitPage {
    constructor() {
        this.pageScroll = new PageScroll();
        this.documentEvents = new DocumentEvents();
        this.fullscreen = new NewsArticleFullscreen();
        this.articleNavigation = new ArticleNavigation();
        this.setPageTheme = new SetPageTheme();
        this.ripple = new ButtonRippleEffect();
        this.pageNavigation = new InitPageNavigation();
        this.articleParser = new PageArticleParser();
    }

    init() {
        this.documentEvents.buttonsHoverEvent();
        this.documentEvents.menuEvent();
        this.documentEvents.searchEvent();
        this.documentEvents.bufferEvent();
        this.pageScroll.headerScrollEvent();
        this.ripple.rippleEvent();
        this.articleParser.articleImagesEvent();
        this.#initOnLoad();
    }

    #initOnLoad() {
        window.addEventListener("load", () => {
            this.fullscreen.fullscreenEvent();
            this.articleNavigation.articleDocInit();
            this.setPageTheme.themeSelectEvent();
            this.pageNavigation.event();
        });
    }
}

let init = new InitPage();
init.init();