
export namespace PageElements {
  export function FixIFramesWithoutFullscreen () {
    let allIFrames = document.querySelectorAll('iframe');

    if (allIFrames && allIFrames.length > 0) {
      for (let i = 0; i < allIFrames.length; i++) {
        if (allIFrames.item(i).allowFullscreen !== true && allIFrames.item(i).src && allIFrames.item(i).src.startsWith('http')) {
          let iFrameClone = allIFrames.item(i).cloneNode(false);
          allIFrames.item(i).parentNode.replaceChild(iFrameClone, allIFrames.item(i));
        }
      }
    }
  }
}