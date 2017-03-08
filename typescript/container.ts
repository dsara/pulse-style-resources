import {Utilities} from "./utilities";

export namespace Container {
    export function adjustContainerWidth() {
        let mainContent = Utilities.getCachedElementById("mainContentWrapper");
        let container = Utilities.getCachedElementById("uu-pulse-container") as HTMLDivElement;
        if (mainContent) {
            let mainContentWidth = parseInt(getComputedStyle(mainContent).width, 10);
            let containerWidth = parseInt(getComputedStyle(container).width, 10);
            if (mainContentWidth > containerWidth) {
                if (window.innerWidth >= 768) {
                    if (mainContentWidth >= 1170) {
                        container.style.width = "100%";
                    }
                    else {
                        if (mainContentWidth < 1170 && mainContentWidth >= 970) {
                            container.style.width = "1170px";
                        }
                        if (mainContentWidth < 970 && mainContentWidth >= 768) {
                            container.style.width = "970px";
                        }
                    }
                }
            }
        }
    }
}