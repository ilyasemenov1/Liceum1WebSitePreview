import { PageScroll, NewsArticleFullscreen, ArticleNavigation, SetPageTheme, ButtonRippleEffect, imgLasyLoading } from "./modules/projectMetods.js";
import { DocumentEvents } from "./modules/documentEvents.js";
import { isWebp } from "./modules/isWebpSupport.js";
import { cookiesEvents } from "./modules/cookies.js";
import "./modules/pageSwiper.js";
import "./modules/maps.js";

import LazyLoad from "vanilla-lazyload";
const lazyLoadInstance = new LazyLoad({
    callback_error: (img) => {
        img.setAttribute("srcset", "fallback_image@1x.jpg 1x, fallback_image@2x.jpg 2x");
        img.setAttribute("src", "fallback_image@1x.jpg");
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
        this.imgLasy = new imgLasyLoading();
    }

    init() {
        this.documentEvents.buttonsHoverEvent();
        this.documentEvents.menuEvent();
        this.documentEvents.searchEvent();
        this.documentEvents.bufferEvent();
        this.pageScroll.headerScrollEvent();
        this.fullscreen.fullscreenEvent();
        this.articleNavigation.articleDocInit();
        this.setPageTheme.themeSelectEvent();
        this.ripple.rippleEvent();
        this.imgLasy.lasyLoad();
    }
}

let init = new InitPage();
init.init();