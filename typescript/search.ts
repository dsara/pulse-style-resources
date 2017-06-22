import {Utilities} from "./utilities";

export namespace Search {
    const searchUrl = "/search/Pages/results.aspx";

    export function setupSearchResults() {
        let searchResults = document.getElementsByClassName("ms-srch-siteSearchResults");
        if (searchResults.length === 0) {
            searchResults = document.getElementsByClassName("ms-searchCenter-result-main");
        }
        if (searchResults.length > 0) {
            let searchDiv = searchResults.item(0) as HTMLDivElement;
            let searchBox = Utilities.getCachedElementById("SearchBox");
            let searchLarge = document.getElementsByClassName("ms-srch-sbLarge");
            let upScopeLinkTop = Utilities.getCachedElementById("UpScopeLinkTop");
            let upScopeLinkBottom = Utilities.getCachedElementById("UpScopeLinkBottom");

            if (searchDiv) {
                searchDiv.style.cssFloat = "none";
            }
            if (searchBox) {
                searchBox.classList.remove("ms-floatleft");
            }
            if (searchLarge.length > 0) {
                for (let i = 0; i < searchLarge.length; i++) {
                    searchLarge.item(i).classList.add("ms-fullWidth");
                }
            }

            if (upScopeLinkTop) {
                upScopeLinkTop.style.display = "";
                upScopeLinkTop.style.width = "";
                upScopeLinkTop.classList.add("col-sm-12", "noBSPadding");

                let upScopeChildren = upScopeLinkTop.children;

                for (let i = 0; i < upScopeChildren.length; i += 2) {
                    (upScopeChildren.item(i) as HTMLDivElement).style.display = "";
                    (upScopeChildren.item(i) as HTMLDivElement).classList.add("noBSPadding", "col-sm-3");
                }

                for (let i = 1; i < upScopeChildren.length; i += 2) {
                    upScopeChildren.item(i).parentNode.removeChild(upScopeChildren.item(i));
                }

                // let colLength = 12 / upScopeLinkTop.querySelectorAll("div:even").length;
                // let colClass = "col-sm-" + colLength.toString();

                // let evenDivs = upScopeLinkTop.querySelectorAll("div:even");
                // for (let i = 0; i < evenDivs.length; i++) {
                //     (evenDivs.item(i) as HTMLDivElement).style.display = "";
                //     (evenDivs.item(i) as HTMLDivElement).classList.add("noBSPadding", colClass);
                // }

                // let oddDivs = upScopeLinkTop.querySelectorAll("div:odd");
                // for (let i = 0; i < oddDivs.length; i++) {
                //     oddDivs.item(i).remove();
                // }
            }

            if (upScopeLinkBottom) {
                upScopeLinkBottom.style.display = "";
                upScopeLinkBottom.style.width = "";
                upScopeLinkBottom.classList.add("col-sm-12", "noBSPadding");

                let upScopeChildren = upScopeLinkBottom.children;

                for (let i = 0; i < upScopeChildren.length; i += 2) {
                    (upScopeChildren.item(i) as HTMLDivElement).style.display = "";
                    (upScopeChildren.item(i) as HTMLDivElement).classList.add("noBSPadding", "col-sm-3");
                }

                for (let i = 1; i < upScopeChildren.length; i += 2) {
                    upScopeChildren.item(i).parentNode.removeChild(upScopeChildren.item(i));
                }

                // let colLength = 12 / upScopeLinkBottom.querySelectorAll("div:even").length;
                // let colClass = "col-sm-" + colLength.toString();

                // let evenDivs = upScopeLinkBottom.querySelectorAll("div:even");
                // for (let i = 0; i < evenDivs.length; i++) {
                //     (evenDivs.item(i) as HTMLDivElement).style.display = "";
                //     (evenDivs.item(i) as HTMLDivElement).classList.add("noBSPadding", colClass);
                // }

                // let oddDivs = upScopeLinkBottom.querySelectorAll("div:odd");
                // for (let i = 0; i < oddDivs.length; i++) {
                //     // doesn't work in ie
                //     // oddDivs.item(i).remove();

                //     oddDivs.item(i).parentNode.removeChild(oddDivs.item(i));
                // }
            }
        }
    }

    export function setupSearch() {
        let globalSearch = Utilities.getCachedElementById("uu-pulse-global-search") as HTMLInputElement;
        let globalSearchButton = Utilities.getCachedElementById("TopSearchA1") as HTMLAnchorElement;

        let mobileSearch = Utilities.getCachedElementById("uu-pulse-suite-bar-right-mobile-search-box-input") as HTMLInputElement;
        let mobileSearchButton = Utilities.getCachedElementById("uu-pulse-suite-bar-right-mobile-search-box-span") as HTMLSpanElement;

        if (globalSearch) {
            globalSearch.addEventListener("keydown", ev => {
                if (ev.keyCode === 13) {
                    Utilities.preventEventDefault(ev);
                    Utilities.getCachedElementById("LoadingResults").style.display = "inline-block";
                    setTimeout("location.href = '" + searchUrl + "?k=" + encodeURIComponent(globalSearch.value) + "'", 15) + "'";
                }
            });
        }

        if (mobileSearch) {
            mobileSearch.addEventListener("keydown", ev => {
                if (ev.keyCode === 13) {
                    Utilities.preventEventDefault(ev);
                    location.href = searchUrl + "?k=" + encodeURIComponent(mobileSearch.value);
                }
            });
        }

        if (mobileSearchButton) {
            mobileSearchButton.addEventListener("click", ev => {
                location.href = searchUrl + "?k=" + encodeURIComponent(mobileSearch.value);
            });
        }

        if (globalSearchButton) {
            globalSearchButton.addEventListener("click", ev => {
                location.href = searchUrl + "?k=" + encodeURIComponent(globalSearch.value);
            });
        }
    }
}