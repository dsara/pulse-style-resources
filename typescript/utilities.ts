export class Utilities {
    static mainRootUrl: string = "";
    static cachedElementsById: { [id: string]: HTMLElement; } = {};

    public static findAncestor(el: HTMLElement, cls: string) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    public static scrollYPosition() {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

    public static getCachedElementById(id: string): HTMLElement {
        if (this.cachedElementsById[id]) {
            //console.log("Returned Cached Element: " + id);
            return this.cachedElementsById[id];
        } else {
            let newCachedElement = document.getElementById(id);
            this.cachedElementsById[id] = newCachedElement;
            return document.getElementById(id);
        }
    }

    public static scrollTo(element: HTMLElement, to: number, duration: number) {
        var start = element.scrollTop,
            change = to - start,
            increment = 20;

        var animateScroll = function (elapsedTime: number) {
            elapsedTime += increment;
            var position = this.easeInOut(elapsedTime, start, change, duration);
            element.scrollTop = position;
            if (elapsedTime < duration) {
                setTimeout(function () {
                    animateScroll(elapsedTime);
                }, increment);
            }
        };

        animateScroll(0);
    }

    public static preventEventDefault(ev: Event) {
        ev.preventDefault();
        ev.stopPropagation();
    }

    static easeInOut(currentTime: number, start: number, change: number, duration: number) {
        currentTime /= duration / 2;
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
        }
        currentTime -= 1;
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }

    public static resizeDocumentationIFrames(iframes: NodeListOf<HTMLIFrameElement>) {
        if (iframes && iframes.length > 0) {
            for (let x = 0; x < iframes.length; x++) {
                let parentWidth = parseInt(window.getComputedStyle(document.querySelector(".uu-pulse-documentation")).width, 10);
                (iframes.item(x)).style.height = (9/16 * parentWidth).toString() + "px";
            }
        }
    }

    public static getMainRootUrl() {
        if (this.mainRootUrl) {
            return this.mainRootUrl;
        } else {
            this.mainRootUrl = window.location.protocol + "//" + window.location.host.replace(/my\./, "");
            return this.mainRootUrl;
        }
    }
}