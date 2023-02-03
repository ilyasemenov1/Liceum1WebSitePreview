
export class IsBrowserSupport {
    constructor() {
        this.isBrowserUnsupportedPage = document.querySelector(".browser-unsupported");
        this.browserSpecs = (function(){
            var ua = navigator.userAgent, tem, 
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if(/trident/i.test(M[1])){
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return {name:'IE',version:(tem[1] || '')};
            }
            if(M[1]=== 'Chrome'){
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if(tem != null) return {name:tem[1].replace('OPR', 'Opera'),version:tem[2]};
            }
            M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
            if((tem = ua.match(/version\/(\d+)/i))!= null)
                M.splice(1, 1, tem[1]);
            return {name:M[0], version:M[1]};
        })();
        if (!this.isBrowserUnsupportedPage) {
            this.browserSupport();
        }
    }

    browserSupport() {
        this.browserSpecs.version = parseFloat(this.browserSpecs.version);
        switch(this.browserSpecs.name) {
            case "Chrome":
                console.log(this.browserSpecs);
                this.browserSpecs.version < 150 ? this.loadPageForUnsupported() : void(0);
                break
            case "Firefox":
                this.browserSpecs.version < 52 ? this.loadPageForUnsupported() : void(0);
                break
            case "Safari":
                this.browserSpecs.version < 10.1 ? this.loadPageForUnsupported() : void(0);
                break
            case "Opera":
                this.browserSpecs.version < 44 ? this.loadPageForUnsupported() : void(0);
                break
            case "Edge":
                this.browserSpecs.version < 16 ? this.loadPageForUnsupported() : void(0);
                break
            case "Opera":
                this.browserSpecs.version < 44 ? this.loadPageForUnsupported() : void(0);
                break
            case "IE":
                this.loadPageForUnsupported();
        }
    }

    loadPageForUnsupported() {
        window.location = "unsupported.html";
    }
}