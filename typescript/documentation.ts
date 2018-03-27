import {Utilities} from "./utilities";

export namespace Documentation {
    export function setupIFrames() {
        let documentationWrappers = document.getElementsByClassName("uu-pulse-documentation");

        if (documentationWrappers && documentationWrappers.length > 0) {
            let documentationIFrames = document.querySelectorAll(".uu-pulse-documentation iframe") as NodeListOf<HTMLIFrameElement>;

            window.addEventListener("resize", (listener) => {
                Utilities.resizeDocumentationIFrames(documentationIFrames);
            });

            Utilities.resizeDocumentationIFrames(documentationIFrames);
        }
    }
}