import {Utilities} from "./utilities";

export namespace BreadCrumb {
    export function setupBreadcrumb() {
        if (Utilities.getCachedElementById("siteBreadcrumb")) {

            // removes 'pages' and 'sitepages' from the breadcrumb unless you are looking at the library view of 'pages' or 'sitepages'
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

            // removes the dashes from the second part of the breadcrumb
            // this is common on publishing and wiki pages
            let secBreadcrumbLinks = document.querySelectorAll(".uu-pulse-site-breadcrumb > span[id*='SiteMapPath1'] > span > a");

            for (let i = 0; i < secBreadcrumbLinks.length; i++) {
                secBreadcrumbLinks.item(i).textContent = secBreadcrumbLinks.item(i).textContent.replace(/\-/g, " ");
            }

            // variables to iterate through each breadcrumb
            let firstBreadCrumbSpans = document.querySelectorAll(".uu-pulse-site-breadcrumb > span[id*='SitesMapPath'] > span");
            let secondBreadCrumbSpans = document.querySelectorAll(".uu-pulse-site-breadcrumb > span[id*='SiteMapPath1'] > span");

            // removes duplicates on second half of the breadcrumb that exist on the second half of the breadcrumb
            for (let i = 0; i < secondBreadCrumbSpans.length; i++) {
                let currentHref = (secondBreadCrumbSpans.item(i).querySelector("a") as HTMLAnchorElement).href;
                if (currentHref) {
                    for (let j = 0; j < secondBreadCrumbSpans.length; j++) {
                        if (j > i) {
                            if ((secondBreadCrumbSpans.item(j).querySelector("a") as HTMLAnchorElement).href === currentHref) {
                                let secondSibling = secondBreadCrumbSpans.item(j).nextElementSibling;
                                secondSibling.parentNode.removeChild(secondSibling);
                                secondBreadCrumbSpans.item(j).parentNode.removeChild(secondBreadCrumbSpans.item(j));
                            }
                        }
                    }
                }
            }

            // removes duplicates on second half of the breadcrumb that exist on the first half of the breadcrumb
            for (let i = 0; i < firstBreadCrumbSpans.length; i++) {
                let currentHref = (firstBreadCrumbSpans.item(i).querySelector("a") as HTMLAnchorElement).href;
                if (currentHref) {
                    for (let j = 0; j < secondBreadCrumbSpans.length; j++) {
                        if (j > 0) {
                            if ((secondBreadCrumbSpans.item(j).querySelector("a") as HTMLAnchorElement).href === currentHref) {
                                let secondSibling = secondBreadCrumbSpans.item(j).nextElementSibling;
                                secondSibling.parentNode.removeChild(secondSibling);
                                secondBreadCrumbSpans.item(j).parentNode.removeChild(secondBreadCrumbSpans.item(j));
                            }
                        }
                    }
                }
            }

            // removes the slash in the second half of the the breadcrumb if it is the only visible items
            let numVisibleSecondItems = 0;
            for (let i = 0; i < secondBreadCrumbSpans.length; i++) {
                if ((secondBreadCrumbSpans.item(i) as HTMLSpanElement).offsetParent != null) {
                    numVisibleSecondItems++;
                }
            }
            if (numVisibleSecondItems === 1) {
                for (let i = 0; i < secondBreadCrumbSpans.length; i++) {
                    secondBreadCrumbSpans.item(i).parentNode.removeChild(secondBreadCrumbSpans.item(i));
                }
            }
        }
    }
}