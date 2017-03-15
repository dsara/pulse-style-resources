import {Utilities} from "./utilities";

export namespace BreadCrumb {
    export function setupBreadcrumb() {
        if (Utilities.getCachedElementById("siteBreadcrumb")) {
            let breadCrumbs = document.querySelectorAll(".uu-pulse-site-breadcrumb > span").item(1).querySelectorAll("span");
            let pageTitle = (Utilities.getCachedElementById("DeltaPlaceHolderPageTitleInTitleArea") as HTMLSpanElement) ? (Utilities.getCachedElementById("DeltaPlaceHolderPageTitleInTitleArea") as HTMLSpanElement).textContent.trim() : "";

            for (let i = 0; i < breadCrumbs.length; i++) {
                if (breadCrumbs.item(i).textContent === "Pages" && pageTitle !== "Pages") {
                    // breadCrumbs.item(i).nextElementSibling.remove();
                    // breadCrumbs.item(i).remove();
                    
                    // above remove is not supported in IE, so below is a fix for it
                    var nextSibling = breadCrumbs.item(i).nextElementSibling;
                    nextSibling.parentNode.removeChild(nextSibling);
                    breadCrumbs.item(i).parentNode.removeChild(breadCrumbs.item(i));
                }

                if (breadCrumbs.item(i).textContent === "SitePages" && pageTitle !== "SitePages") {
                    // breadCrumbs.item(i).nextElementSibling.remove();
                    // breadCrumbs.item(i).remove();

                    // above remove is not supported in IE, so below is a fix for it
                    var nextSibling = breadCrumbs.item(i).nextElementSibling;
                    nextSibling.parentNode.removeChild(nextSibling);
                    breadCrumbs.item(i).parentNode.removeChild(breadCrumbs.item(i));
                }
            }
        }
    }
}