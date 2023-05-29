import { MutableRefObject, useEffect, useRef } from "react";

interface Props<T> {}

interface UseExportPdfReturn<T> {
  ref: MutableRefObject<T>;
  exportPrint: () => void;
}

export default function useExportPdf<T extends HTMLElement>(): UseExportPdfReturn<T> {
  const ref = useRef<T>();
  const withInitialStyleRef = useRef<HTMLStyleElement>();

  function exportPrint() {
    if (!ref) return;

    const printArea = ref.current;
    const newIframe = document.createElement("iframe");
    newIframe.id = "print-frame";
    newIframe.style.display = "none";
    newIframe.onload = () => {
      const iFrameWindow: Window = newIframe.contentWindow;
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

    linkStyles.forEach((style) => {
      const cloneStyle = style.cloneNode(true);
      newWindow.document.head.appendChild(cloneStyle);
    });
  }

  useEffect(() => {
    if (!ref.current) return;

    // @media print {
    //   @page { margin: 0; }
    //     body { margin: 1.6cm; }
    //   }
  }, [ref?.current]);

  return {
    ref: ref,
    exportPrint: exportPrint,
  };
}
