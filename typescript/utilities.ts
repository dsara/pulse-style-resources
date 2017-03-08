export namespace Utilities {
    var mainRootUrl = "";

    export function findAncestor(el: HTMLElement, cls: string) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    export function scrollYPosition() {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

    var cachedElementsById: { [id: string]: HTMLElement; } = {};

    export function getCachedElementById(id: string): HTMLElement {
        if (cachedElementsById[id]) {
            //console.log("Returned Cached Element: " + id);
            return cachedElementsById[id];
        } else {
            let newCachedElement = document.getElementById(id);
            cachedElementsById[id] = newCachedElement;
            return document.getElementById(id);
        }
    }

    export function scrollTo(element: HTMLElement, to: number, duration: number) {
        var start = element.scrollTop,
            change = to - start,
            increment = 20;

        var animateScroll = function (elapsedTime: number) {
            elapsedTime += increment;
            var position = easeInOut(elapsedTime, start, change, duration);
            element.scrollTop = position;
            if (elapsedTime < duration) {
                setTimeout(function () {
                    animateScroll(elapsedTime);
                }, increment);
            }
        };

        animateScroll(0);
    }

    function easeInOut(currentTime: number, start: number, change: number, duration: number) {
        currentTime /= duration / 2;
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
        }
        currentTime -= 1;
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }

    export function getMainRootUrl() {
        if (mainRootUrl) {
            return mainRootUrl;
        } else {
            mainRootUrl = window.location.protocol + "//" + window.location.host.replace(/my\./, "");
            return mainRootUrl;
        }
    }
}