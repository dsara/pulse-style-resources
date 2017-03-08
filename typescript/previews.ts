export namespace Previews {
    export function setupPreviews() {
        var documentOpenMenu = document.querySelectorAll("#onetidDoclibViewTbl0 a[title='Open Menu']");

        for (let i = 0; i < documentOpenMenu.length; i++) {
            documentOpenMenu.item(i).addEventListener("click", (ev: MouseEvent) => {
                setTimeout(function () {
                    addPdfFileView()
                }, 700);
            });
        }
    }

    function addPdfFileView() {
        var jsCallout = document.getElementsByClassName("js-callout-mainElement");
        for (let i = 0; i < jsCallout.length; i++) {
            if (getComputedStyle(jsCallout.item(i)).display != "none") {
                var calloutInput = (jsCallout.item(i) as HTMLDivElement).querySelector(".js-callout-location") as HTMLInputElement;

                if (calloutInput) {
                    let pdfPath = calloutInput.value;
                    if (pdfPath.indexOf(".pdf") !== -1) {
                        var objStr = "<object data='" + pdfPath + "?Web=1' type='application/pdf' style='width: 100%; height: 250px;'><p>It appears you don't have a PDF plugin for this browser/device. You can <a href='" + pdfPath + "'>click here to download the PDF file.</a></p></object>";
                        let jsBody = jsCallout.item(i).querySelector(".js-callout-body") as HTMLDivElement;
                        if (jsBody) {
                            jsBody.innerHTML = objStr + jsBody.innerHTML;
                        }
                    }
                }
            }
        }
    }
}