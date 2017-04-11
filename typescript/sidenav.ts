import {Utilities} from "./utilities";

export namespace SideNav {
    export function setupSideNav(masterpageType: string) {
        if (masterpageType == "site") {
            var contentRow = Utilities.getCachedElementById("contentRow");
            var pulseSideNavLinks = Utilities.getCachedElementById("uu-pulse-side-nav-links") as HTMLDivElement;
            var deltaPlaceHolderLeftNav = Utilities.getCachedElementById("DeltaPlaceHolderLeftNavBar") as HTMLDivElement;
            var leftNavWebPartsZone = deltaPlaceHolderLeftNav.querySelector(".ms-webpart-zone") as HTMLDivElement;

            if (pulseSideNavLinks) {
                if (pulseSideNavLinks.childElementCount === 0) {
                    if (contentRow) {
                        contentRow.classList.remove("uu-pulse-side-nav-shown");
                        contentRow.classList.add("uu-pulse-side-nav-hidden");
                    }
                } else {
                    if (contentRow) {
                        contentRow.classList.remove("uu-pulse-side-nav-hidden");
                        contentRow.classList.add("uu-pulse-side-nav-shown");
                    }

                    setupEvents();
                }
            } else if (leftNavWebPartsZone) {
                if (contentRow) {
                    contentRow.classList.remove("uu-pulse-side-nav-hidden");
                    contentRow.classList.add("uu-pulse-side-nav-shown");
                }
                leftNavWebPartsZone.classList.add("uu-pulse-site-nav-links");

                var leftNavWebParts = leftNavWebPartsZone.querySelectorAll(".ms-webpartzone-cell");

                for (let i = 0; i < leftNavWebParts.length; i++) {
                    leftNavWebParts.item(i).classList.remove("ms-webpartzone-cell");
                }
            } else {
                if (contentRow) {
                    contentRow.classList.remove("uu-pulse-side-nav-shown");
                    contentRow.classList.add("uu-pulse-side-nav-hidden");
                }
            }
        } else if (masterpageType == "team" || masterpageType == "app") {
            var deltaPlaceHolderLeftNav = Utilities.getCachedElementById("DeltaPlaceHolderLeftNavBar") as HTMLDivElement;
            var leftNavWebPartsZone = deltaPlaceHolderLeftNav.querySelector(".ms-webpart-zone") as HTMLDivElement;

            if (leftNavWebPartsZone) {
                leftNavWebPartsZone.classList.add("uu-pulse-site-nav-links");

                var leftNavWebParts = leftNavWebPartsZone.querySelectorAll(".ms-webpartzone-cell");

                for (let i = 0; i < leftNavWebParts.length; i++) {
                    leftNavWebParts.item(i).classList.remove("ms-webpartzone-cell");
                }
            }

            setupEvents();
        }

        window.addEventListener("scroll", ev => {
            sideNavSizeChange();
        });
    }

    function setupEvents() {
        var pulseContentNavButton = Utilities.getCachedElementById("uu-pulse-content-nav-button");
        var pulseSideNav = Utilities.getCachedElementById("uu-pulse-side-nav");
        var pulseSideNavClose = Utilities.getCachedElementById("uu-pulse-side-nav-links-close");

        if (pulseContentNavButton) {
            pulseContentNavButton.addEventListener("click", ev => {
                if (pulseSideNav) {
                    pulseSideNav.classList.add("uu-pulse-side-nav-slide-out");
                }
            });
        }

        if (pulseSideNavClose) {
            pulseSideNavClose.addEventListener("click", ev => {
                if (pulseSideNav) {
                    pulseSideNav.classList.remove("uu-pulse-side-nav-slide-out");
                }
            });
        }

        document.querySelector("body").addEventListener("click", ev => {
            if (Utilities.findAncestor((ev.target as HTMLElement), "uu-pulse-side-nav-links") == null && (ev.target as HTMLElement).id !== "uu-pulse-content-nav-button") {
                if (pulseSideNav) {
                    pulseSideNav.classList.remove("uu-pulse-side-nav-slide-out");
                }
            }
        });
    }

    export function sideNavSizeChange() {
        var pulseSideNav = Utilities.getCachedElementById("uu-pulse-side-nav");
        var ribbonBar = document.querySelector(".ms-cui-ribbonTopBars");
        var pulseContentNavButton = Utilities.getCachedElementById("uu-pulse-content-nav-button");
        var pulseSuiteBar = Utilities.getCachedElementById("uu-pulse-suite-bar");

        if (window.innerWidth >= 992) {
            if (pulseSideNav) {
                pulseSideNav.classList.remove("uu-pulse-side-nav-slide-out");
                pulseSideNav.style.top = "";
            }
        } else {
            if (ribbonBar) {
                if (pulseSideNav && pulseContentNavButton) {
                    if (ribbonBar.getBoundingClientRect().bottom <= 0) {
                        if (pulseSuiteBar) {
                            if (pulseSuiteBar.getBoundingClientRect().bottom > 0) {
                                let pulseSuiteBarBottom = pulseSuiteBar.getBoundingClientRect().bottom.toString();
                                pulseContentNavButton.style.top = pulseSuiteBarBottom + "px";
                                pulseSideNav.style.top = pulseSuiteBarBottom + "px";
                                pulseSideNav.style.height = "calc(100% - " + pulseSuiteBarBottom + "px)"
                            } else {
                                pulseSideNav.style.top = "0";
                                pulseSideNav.style.height = "100%";
                                pulseContentNavButton.style.top = "0";
                            }
                        } else {
                            pulseSideNav.style.top = "0";
                            pulseSideNav.style.height = "100%";
                            pulseContentNavButton.style.top = "0";
                        }
                    } else {
                        if (pulseSuiteBar) {
                            if (pulseSuiteBar.getBoundingClientRect().bottom > ribbonBar.getBoundingClientRect().bottom) {
                                let pulseSuiteBarBottom = pulseSuiteBar.getBoundingClientRect().bottom.toString();
                                pulseContentNavButton.style.top = pulseSuiteBarBottom + "px";
                                pulseSideNav.style.top = pulseSuiteBarBottom + "px";
                                pulseSideNav.style.height = "calc(100% - " + pulseSuiteBarBottom + "px)"
                            } else {
                                let ribbonBottomBound = ribbonBar.getBoundingClientRect().bottom.toString();
                                pulseContentNavButton.style.top = ribbonBottomBound + "px";
                                pulseSideNav.style.top = ribbonBottomBound + "px";
                                pulseSideNav.style.height = "calc(100% - " + ribbonBottomBound + "px)"
                            }
                        } else {
                            let ribbonBottomBound = ribbonBar.getBoundingClientRect().bottom.toString();
                            pulseContentNavButton.style.top = ribbonBottomBound + "px";
                            pulseSideNav.style.top = ribbonBottomBound + "px";
                            pulseSideNav.style.height = "calc(100% - " + ribbonBottomBound + "px)";
                        }
                    }
                }
            }
        }
    }
}