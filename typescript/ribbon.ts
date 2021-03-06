import {Utilities} from "./utilities";

export namespace Ribbon {
    export function setupRibbon(masterpageType: string) {
        let dockElement: HTMLDivElement = getDockElement(masterpageType);
        let ribbonRow = Utilities.getCachedElementById("s4-ribbonrow") as HTMLDivElement;
        let ribbonWhiteSpace = Utilities.getCachedElementById("ribbonWhiteSpace") as HTMLDivElement;

        if (dockElement && ribbonRow) {
            // initial setting of ribbon location
            if (doesPageNeedFixedRibbon()) {
                if (isScrolledIntoView(masterpageType)) {
                    setIsScrolledIntoView(ribbonRow, ribbonWhiteSpace, masterpageType);
                }
                else {
                    setIsntSrcolledIntoView(ribbonRow, ribbonWhiteSpace, masterpageType);
                }
            }

            // change ribbon location on window scroll
            window.addEventListener("scroll", ev => {
                scrollEventActions(masterpageType);
            });

            document.body.addEventListener("click", ev => {
                if (Utilities.findAncestor((ev.target as HTMLElement), "uu-pulse-ribbon") != null) {
                    scrollEventActions(masterpageType);
                }
            });     

            // change ribbon location on window resize
            window.addEventListener("resize", ev => {
                setRibbonMenuStatus(masterpageType);
                setRibbonToolTipStatus(masterpageType);
                if (doesPageNeedFixedRibbon()) {
                    if (window.innerWidth < 768) {
                        setIsntSrcolledIntoView(ribbonRow, ribbonWhiteSpace, masterpageType);
                    } else {
                        if (isScrolledIntoView(masterpageType)) {
                            setIsScrolledIntoView(ribbonRow, ribbonWhiteSpace, masterpageType);
                            // ribbonRow.style.width = "";
                        }
                        else {
                            setIsntSrcolledIntoView(ribbonRow, ribbonWhiteSpace, masterpageType);
                            // ribbonRow.style.width = getComputedStyle(document.getElementsByClassName("container").item(0)).width;
                        }
                    }
               }
            });
        }
    }

    function getDockElement(masterpageType: string): HTMLDivElement {
        let dockElement: HTMLDivElement = null;
        if (masterpageType == 'site' || masterpageType == 'team' || (window.innerWidth < 992 && masterpageType == 'app')) {
            dockElement = Utilities.getCachedElementById("uu-pulse-suite-bar") as HTMLDivElement;
        } else if (masterpageType == 'app') {
            dockElement = Utilities.getCachedElementById("titleAndSearch") as HTMLDivElement;
        }
        return dockElement;
    }

    function scrollEventActions(masterpageType: string) {
        let dockElement = getDockElement(masterpageType);
        let ribbonRow = Utilities.getCachedElementById("s4-ribbonrow") as HTMLDivElement;
        let ribbonWhiteSpace = Utilities.getCachedElementById("ribbonWhiteSpace") as HTMLDivElement;

        setRibbonMenuStatus(masterpageType);
        setRibbonToolTipStatus(masterpageType);
        if (doesPageNeedFixedRibbon()) {
            if (window.innerWidth < 768) {
                setIsntSrcolledIntoView(ribbonRow, ribbonWhiteSpace, masterpageType);
            } else {
                if (isScrolledIntoView(masterpageType)) {
                    setIsScrolledIntoView(ribbonRow, ribbonWhiteSpace, masterpageType);
                }
                else {
                    setIsntSrcolledIntoView(ribbonRow, ribbonWhiteSpace, masterpageType);
                }
            }
        }
        else {
            ribbonRow.classList.remove("dockRibbon");
            if (masterpageType == "app") {
                ribbonRow.style.width = "";
            }
            ribbonWhiteSpace.style.height = "0";
        }
    }

    function setRibbonMenuStatus(masterpageType: string) {
        let ribbonBar = Utilities.getCachedElementById("ribbonBar") as HTMLDivElement;
        let ribbonTopBars = document.getElementsByClassName("ms-cui-ribbonTopBars");

        if (doesPageNeedFixedRibbon()) {
            if (!isScrolledIntoView(masterpageType)) {
                document.body.classList.add("uu-pulse-docked-ribbon-menus");
                return;
            }
            else if (window.scrollY !== 0) {
                document.body.classList.add("uu-pulse-docked-ribbon-menus");
                return;
            }
        } else {
            if (ribbonBar) {
                if (!isScrolledIntoView(masterpageType)) {
                    if (ribbonTopBars.length > 0) {
                        if (isScrolledIntoView(masterpageType, ribbonTopBars.item(0) as HTMLDivElement)) {
                            document.body.classList.add("uu-pulse-docked-ribbon-menus");
                            return;
                        }
                    }
                } else if (window.scrollY !== 0) {
                    document.body.classList.add("uu-pulse-docked-ribbon-menus");
                    return;
                }
            }
        }
        if (document.body.classList.contains("uu-pulse-docked-ribbon-menus")) {
            document.body.classList.remove("uu-pulse-docked-ribbon-menus");
            return;
        }
    }

    function setRibbonToolTipStatus(masterpageType: string) {
        if (((masterpageType == 'site' || masterpageType == 'team') && doesPageNeedFixedRibbon()) || (masterpageType == 'app' && doesPageNeedFixedRibbon() && !isScrolledIntoView(masterpageType))) {
            if (window.innerWidth < 768) {
                document.body.classList.add("uu-pulse-docked-ribbon-tooltips");
                return;
            } else {
                if (!isScrolledIntoView(masterpageType)) {
                    document.body.classList.add("uu-pulse-docked-ribbon-tooltips");
                    return;
                }
                if (masterpageType == 'app' && window.scrollY !== 0) {
                    document.body.classList.add("uu-pulse-docked-ribbon-tooltips");
                    return;
                }
            }
            
            // if (!isScrolledIntoView(masterpageType)) {
            //     document.body.classList.add("uu-pulse-docked-ribbon-tooltips");
            //     return;
            // }
            // if (masterpageType == 'app' && window.scrollY !== 0) {
            //     document.body.classList.add("uu-pulse-docked-ribbon-tooltips");
            //     return;
            // }
        }
        if (document.body.classList.contains("uu-pulse-docked-ribbon-tooltips")) {
            document.body.classList.remove("uu-pulse-docked-ribbon-tooltips");
            return;
        }
    }

    function setIsScrolledIntoView(ribbonRow: HTMLDivElement, ribbonWhiteSpace: HTMLDivElement, masterpageType: string) {
        ribbonRow.classList.remove("dockRibbon");
        if (masterpageType == 'app') {
            ribbonRow.style.width = "";
        }
        if (masterpageType == 'team' || masterpageType == 'site') {
            ribbonRow.style.marginLeft = "";
        }
        ribbonWhiteSpace.style.height = "0";
    }

    function setIsntSrcolledIntoView(ribbonRow: HTMLDivElement, ribbonWhiteSpace: HTMLDivElement, masterpageType: string) {
        ribbonRow.classList.add("dockRibbon");
        let authenticatedWrapper = Utilities.getCachedElementById("authenticatedWrapper") as HTMLDivElement;
        if (masterpageType == 'team' || masterpageType == 'site') {
            if (authenticatedWrapper) {
                ribbonRow.style.marginLeft = (authenticatedWrapper.offsetLeft * -1) + "px";
            }
            //ribbonRow.style.width = getComputedStyle(document.getElementsByClassName("container").item(0)).width;
        }
        ribbonWhiteSpace.style.height = getComputedStyle(ribbonRow).height;
    }

    function isScrolledIntoView(masterpageType: string, elem: HTMLDivElement = null) {
        let dockElement: HTMLDivElement = null;
        if (elem) {
            dockElement = elem;
        } else {
            dockElement = getDockElement(masterpageType);
        }   

        if (masterpageType == 'site' || masterpageType == 'team') {
            return (dockElement.getBoundingClientRect().bottom > 0 ? true : false);
        } 
        if (masterpageType == 'app')  {
            return (dockElement.getBoundingClientRect().bottom > (window.innerWidth < 768 ? 42 : 0) ? true : false);
        }
    }

    function isAtTopOfView(elem: HTMLDivElement) {
        return (elem.getBoundingClientRect().top <= 0 ? true : false);
    }

    function doesPageNeedFixedRibbon() {
        let MSOLayoutInput = Utilities.getCachedElementById("MSOLayout_InDesignMode") as HTMLInputElement;
        let wikiPageMode = Utilities.getCachedElementById("_wikiPageMode") as HTMLInputElement;

        if (MSOLayoutInput) {
            if (MSOLayoutInput.value === "1" || (wikiPageMode ? wikiPageMode.value : null === "Edit") ||
                document.getElementsByClassName("ms-rtestate-write").length > 0 ||
                document.getElementsByClassName("ms-cui-cg").length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    export function adjustRibbonBars(masterpageType: string) {
        if (masterpageType == 'site' || masterpageType == 'team') {
            let IFribbonVisible = Utilities.getCachedElementById("s4-ribbonrow") ? Utilities.getCachedElementById("s4-ribbonrow").offsetParent : null;
            if (IFribbonVisible !== null) {
                let authenticatedWrapper = Utilities.getCachedElementById("authenticatedWrapper");
                if (authenticatedWrapper) {
                    let ribbonBarBackground = Utilities.getCachedElementById("ribbonBarBackground");
                    if (ribbonBarBackground) {
                        ribbonBarBackground.style.marginLeft = (authenticatedWrapper.offsetLeft * -1).toString() + "px";
                        ribbonBarBackground.style.width = getComputedStyle(document.querySelector("body")).width;
                    }

                    let msCuiTopBar2 = document.getElementsByClassName("ms-cui-topBar2");
                    if (msCuiTopBar2.item(0)) {
                        // ribbonBarBackground.style.maxHeight = ((msCuiTopBar2.item(0) as HTMLDivElement).style.height + 2).toString() + "px";
                    }
                }
            }
        }
    }
}