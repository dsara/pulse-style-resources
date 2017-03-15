import {Utilities} from "./utilities";

export namespace SuiteBar {
    export function setupSuiteBar() {
        let welcomeBoxImg = (document.querySelector("#welcomeMenuBox .ms-menu-hovarw img") as HTMLImageElement);
        welcomeBoxImg.style.left = "";
        welcomeBoxImg.style.top = "";
        welcomeBoxImg.style.left = "-95px";
        welcomeBoxImg.style.top = "-259px";

        setHomeUrls();
        setAToZUrls();
        setHSCUrls();
        setupMobileButtons();
    }

    export function resizeHSCBackgroundBar() {
        let authenticatedWrapper = Utilities.getCachedElementById("authenticatedWrapper");
        let hscBackground = Utilities.getCachedElementById("hscBarBackground");

        if (authenticatedWrapper && hscBackground) {
            hscBackground.style.marginLeft = (authenticatedWrapper.offsetLeft * -1).toString() + "px";
            hscBackground.style.width = getComputedStyle(document.querySelector("body")).width;
        }
    }
    
    export function setHSCUrls() {
        let healthcare = Utilities.getCachedElementById("uu-pulse-hsc-healthcare") as HTMLAnchorElement;
        let education = Utilities.getCachedElementById("uu-pulse-hsc-education") as HTMLAnchorElement;
        let research = Utilities.getCachedElementById("uu-pulse-hsc-research") as HTMLAnchorElement;

        if (healthcare) {
            healthcare.href = Utilities.getMainRootUrl() + "/site/healthcare/";
        }
        if (education) {
            education.href = Utilities.getMainRootUrl() + "/site/education/";
        }
        if (research) {
            research.href = Utilities.getMainRootUrl() + "/site/research/";
        }
    }

    export function setHomeUrls() {
        let homeLogos = document.getElementsByClassName("uu-pulse-home-logo-anchor");

        for (let i = 0; i < homeLogos.length; i++) {
            (homeLogos.item(i) as HTMLAnchorElement).href = Utilities.getMainRootUrl();
        }
    }

    export function setAToZUrls() {
        let atoz = Utilities.getCachedElementById("SiteMap_AtoZ") as HTMLAnchorElement;
        if (atoz) {
            atoz.href = Utilities.getMainRootUrl() + "/pages/SiteMap.aspx";
        }

        let admin = Utilities.getCachedElementById("SiteMap_Admin") as HTMLAnchorElement;
        if (admin) {
            admin.href = Utilities.getMainRootUrl() + "/pages/SiteMap.aspx?cat=Administration";
        }

        let clinical = Utilities.getCachedElementById("SiteMap_Clinical") as HTMLAnchorElement;
        if (clinical) {
            clinical.href = Utilities.getMainRootUrl() + "/pages/SiteMap.aspx?cat=Clinical";
        }

        let finance = Utilities.getCachedElementById("SiteMap_Finance") as HTMLAnchorElement;
        if (finance) {
            finance.href = Utilities.getMainRootUrl() + "/pages/SiteMap.aspx?cat=Finance";
        }

        let hr = Utilities.getCachedElementById("SiteMap_HR") as HTMLAnchorElement;
        if (hr) {
            hr.href = Utilities.getMainRootUrl() + "/pages/SiteMap.aspx?cat=HR";
        }

        let it = Utilities.getCachedElementById("SiteMap_IT") as HTMLAnchorElement;
        if (it) {
            it.href = Utilities.getMainRootUrl() + "/pages/SiteMap.aspx?cat=IT";
        }
    }

    export function setupMobileButtons() {
        var mobileSearchIcon = Utilities.getCachedElementById("uu-pulse-suite-bar-right-mobile-search");
        var mobileSearchBox = Utilities.getCachedElementById("uu-pulse-suite-bar-right-mobile-search-box");
        var mobileSearchInput = Utilities.getCachedElementById("uu-pulse-suite-bar-right-mobile-search-box-input") as HTMLInputElement;

        if (mobileSearchIcon) {
            mobileSearchIcon.addEventListener("click", ev => {
                if (mobileSearchIcon.classList.contains("selected")) {
                    mobileSearchIcon.classList.remove("selected");
                }
                else {
                    mobileSearchIcon.classList.add("selected");
                }

                if (mobileSearchBox) {
                    if (mobileSearchBox.classList.contains("hidden")) {
                        mobileSearchBox.classList.remove("hidden");
                        mobileSearchInput.focus();
                    }
                    else {
                        mobileSearchBox.classList.add("hidden");
                        mobileSearchInput.blur();
                    }
                }
            });

            document.body.addEventListener("click", ev => {
                if (!mobileSearchBox.classList.contains("hidden")) {
                    if ((ev.target as HTMLElement).id !== "uu-pulse-suite-bar-right-mobile-search-box-input" && (ev.target as HTMLElement).id !== "uu-pulse-suite-bar-right-mobile-search-box-span" && (ev.target as HTMLElement).id !== "uu-pulse-suite-bar-right-mobile-search") {
                        mobileSearchBox.classList.add("hidden");
                        mobileSearchIcon.classList.remove("selected");
                    }
                }
            });
        }

        var mobileMenuIcon = Utilities.getCachedElementById("uu-pulse-suite-bar-right-mobile-menu");
        var mobileMenuList = Utilities.getCachedElementById("uu-pulse-suite-bar-right-atoz");

        if (mobileMenuIcon) {
            mobileMenuIcon.addEventListener("click", ev => {
                if (mobileMenuIcon.classList.contains("selected")) {
                    mobileMenuIcon.classList.remove("selected");
                }
                else {
                    mobileMenuIcon.classList.add("selected");
                }

                if (mobileMenuList) {
                    if (mobileMenuList.classList.contains("uu-pulse-inline-block")) {
                        mobileMenuList.classList.remove("uu-pulse-inline-block");
                    }
                    else {
                        mobileMenuList.classList.add("uu-pulse-inline-block");
                    }
                }
            });

            document.body.addEventListener("click", ev => {
                if (mobileMenuList.classList.contains("uu-pulse-inline-block") && (ev.target as HTMLElement).id !== "uu-pulse-suite-bar-right-mobile-menu") {
                    if (Utilities.findAncestor((ev.target as HTMLElement), "uu-pulse-suite-bar-right-atoz") == null) {
                        mobileMenuList.classList.remove("uu-pulse-inline-block");
                        mobileMenuIcon.classList.remove("selected");
                    }
                }
            });

        }
    }

    export function mobileButtonResizes() {
        // if (window.innerWidth >= 768) {
        //     let mobileSearchBox = Utilities.getCachedElementById("uu-pulse-suite-bar-right-mobile-search-box");
        //     var mobileSearchIcon = Utilities.getCachedElementById("uu-pulse-suite-bar-right-mobile-search");
        //     if (mobileSearchBox) {
        //         mobileSearchBox.classList.add("hidden");
        //     }
        //     if (mobileSearchIcon) {
        //         mobileSearchIcon.classList.remove("selected");
        //     }
        // }

        // var mobileMenuList = Utilities.getCachedElementById("uu-pulse-suite-bar-right-atoz");
        // var mobileMenuIcon = Utilities.getCachedElementById("uu-pulse-suite-bar-right-mobile-menu");

        // if (window.innerWidth >= 992) {
        //     if (mobileMenuList) {
        //         mobileMenuList.classList.remove("uu-pulse-inline-block");
        //     }
        //     if (mobileMenuIcon) {
        //         mobileMenuIcon.classList.remove("selected");
        //     }
        // }

        // if (window.innerWidth < 992) {
        //     if (!mobileMenuIcon.classList.contains("selected")) {
        //         mobileMenuList.classList.remove("uu-pulse-inline-block");
        //     }
        // }
    }
}
