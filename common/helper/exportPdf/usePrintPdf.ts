import { MutableRefObject, useRef } from "react";

interface Props<T> {}

interface UseExportPdfReturn<T> {
  printComponentRef: MutableRefObject<T>;
  exportPrint: () => void;
}

export default function usePrintPdf<T extends HTMLElement>(): UseExportPdfReturn<T> {
  const printComponentRef = useRef<T>();

  function printPage() {
    if (!printComponentRef) return;

    const printArea = printComponentRef.current;
    const newIframe = document.createElement("iframe");
    newIframe.id = "print-frame";
    newIframe.style.display = "none";
    newIframe.onload = () => {
      const iFrameWindow: Window = newIframe.contentWindow;

      iFrameWindow.document.body.style.padding = "1.6cm";
      iFrameWindow.document.body.style.boxSizing = "border-box";

      new Promise((resolve, reject) => {
        try {
          copyStyle(iFrameWindow);
          resolve(true);
        } catch (e) {
          reject(false);
        }
      }).then(() => {
        iFrameWindow.print();
      });
    };

    document.body.appendChild(newIframe);
    const newWindow = newIframe.contentWindow;
    newWindow.document.body.innerHTML = printArea.innerHTML;
  }

  function copyStyle(newWindow: Window) {
    const TOP = window.top;
    const linkStyles = TOP.document.querySelectorAll("style");
    const defaultStyle = document.createElement("style");
    defaultStyle.innerHTML = `
      @media print {
        @page { margin: 1.6cm; }
        body { margin: 1.6cm; }
      }
    `;

    newWindow.document.head.appendChild(defaultStyle);
    linkStyles.forEach((style) => {
      const cloneStyle = style.cloneNode(true);
      newWindow.document.head.appendChild(cloneStyle);
    });
  }

  return {
    printComponentRef: printComponentRef,
    exportPrint: printPage,
  };
}
