import {Utilities} from "./utilities";

export namespace Footer {
    export function setupFooter() {
        let currentYear = Utilities.getCachedElementById("CurrentYear");
        if (currentYear) {
            currentYear.innerHTML = (new Date()).getFullYear().toString();
        }

        let topOfPageFooterDiv = Utilities.getCachedElementById("TopOfPageFooterDiv");

        if (topOfPageFooterDiv) {
            topOfPageFooterDiv.addEventListener("click", ev => {
                Utilities.scrollTo(document.body, 0, 1000);
            });
        }
    }
}