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

            // fixes breadcrumb links that are created in Term Driven navigation nodes to correctly have the right href
            let breadCrumbAnchors = document.querySelectorAll(".uu-pulse-site-breadcrumb > span > span > a");

            for (let i = 0; i < breadCrumbAnchors.length; i++) {
                let breadCrumbHref = (breadCrumbAnchors.item(i) as HTMLAnchorElement).href;
                if (breadCrumbHref.indexOf("/_layouts/15/listform.aspx") != -1) {
                    (breadCrumbAnchors.item(i) as HTMLAnchorElement).href = decodeURIComponent(breadCrumbHref.substring(breadCrumbHref.indexOf("%2F")));
                }
            }

            // removes the dashes from the second part of the breadcrumb
            // this is common on publishing and wiki pages
            let secBreadcrumbLinks = document.querySelectorAll(".uu-pulse-site-breadcrumb > span[id*='SiteMapPath1'] > span > a");

            for (let i = 0; i < secBreadcrumbLinks.length; i++) {
                secBreadcrumbLinks.item(i).textContent = secBreadcrumbLinks.item(i).textContent.replace(/\-/g, " ");
            }

            // variables to iterate through each breadcrumb
            var firstBreadCrumbAnchors = document.querySelectorAll(".uu-pulse-site-breadcrumb > span[id*='SitesMapPath'] > span > a");
            var secondBreadCrumbAnchors = document.querySelectorAll(".uu-pulse-site-breadcrumb > span[id*='SiteMapPath1'] > span > a");

            // removes duplicates on second half of the breadcrumb that exist on the second half of the breadcrumb
            for (let i = 0; i < secondBreadCrumbAnchors.length; i++) {
                let currentHref = (secondBreadCrumbAnchors.item(i) as HTMLAnchorElement).href;
                if (currentHref) {
                    for (let j = 0; j < secondBreadCrumbAnchors.length; j++) {
                        if (j > i) {
                            if ((secondBreadCrumbAnchors.item(j) as HTMLAnchorElement).href === currentHref) {
                                let secondSibling = secondBreadCrumbAnchors.item(j).parentElement.nextElementSibling;
                                secondSibling.parentNode.removeChild(secondSibling);
                                secondBreadCrumbAnchors.item(j).parentElement.parentNode.removeChild(secondBreadCrumbAnchors.item(j).parentElement);
                            }
                        }
                    }
                }
            }

            firstBreadCrumbAnchors = document.querySelectorAll(".uu-pulse-site-breadcrumb > span[id*='SitesMapPath'] > span > a");
            secondBreadCrumbAnchors = document.querySelectorAll(".uu-pulse-site-breadcrumb > span[id*='SiteMapPath1'] > span > a");

            // removes duplicates on second half of the breadcrumb that exist on the first half of the breadcrumb
            for (let i = 0; i < firstBreadCrumbAnchors.length; i++) {
                let currentHref = (firstBreadCrumbAnchors.item(i) as HTMLAnchorElement).href;
                if (currentHref) {
                    for (let j = 0; j < secondBreadCrumbAnchors.length; j++) {
                        if (j > 0) {
                            if ((secondBreadCrumbAnchors.item(j) as HTMLAnchorElement).href === currentHref) {
                                let secondSibling = secondBreadCrumbAnchors.item(j).parentElement.nextElementSibling;
                                secondSibling.parentNode.removeChild(secondSibling);
                                secondBreadCrumbAnchors.item(j).parentElement.parentNode.removeChild(secondBreadCrumbAnchors.item(j).parentElement);
                            }
                        }
                    }
                }
            }

            // removes the slash in the second half of the the breadcrumb if it is the last item
            let secondBreadCrumbSpans = document.querySelectorAll(".uu-pulse-site-breadcrumb > span[id*='SiteMapPath1'] > span");
            if (secondBreadCrumbSpans.length > 0) {
                if ((secondBreadCrumbSpans.item(secondBreadCrumbSpans.length - 1) as HTMLSpanElement).textContent.trim() == "/") {
                    secondBreadCrumbSpans.item(secondBreadCrumbSpans.length - 1).parentNode.removeChild(secondBreadCrumbSpans.item(secondBreadCrumbSpans.length - 1));
                }
            } else {
                
            }
        }
    }
}