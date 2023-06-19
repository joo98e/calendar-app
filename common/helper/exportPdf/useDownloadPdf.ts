import axios from "axios";
import type { MutableRefObject } from "react";
import { ExportPdfRequestType } from "@api/export/pdf";

interface GetPrintElementList {
  wrappedDOMTree: HTMLElement[];
  targetElements: HTMLElement[];
}

type HTMLString = string;

const MILLIMETER_297_TO_PX = 700 as const;

export default function useDownloadPdf() {
  const END_POINT = "/api/export/pdf" as const;
  const localInstance = axios.create({
    headers: {},
    baseURL: process.env.NEXT_PUBLIC_CLIENT_URL,
  });

  function greaterThan297mm(clientHeight: number) {
    return clientHeight > MILLIMETER_297_TO_PX;
  }

  function toHTMLElement(node: Node): HTMLElement {
    if (node instanceof HTMLElement) {
      return node;
    }
    return null;
  }

  function getPrintElementList(rootElement: HTMLElement): GetPrintElementList {
    let parentDOMTree: HTMLElement[] = [];
    let targetElements: HTMLElement[] = null;

    while (targetElements === null) {
      const parentNode: HTMLElement = parentDOMTree.length ? parentDOMTree[parentDOMTree.length - 1] : toHTMLElement(rootElement);

      if (parentNode.childNodes.length === 1) {
        const cloneNode = toHTMLElement(parentNode.childNodes[0]);
        parentDOMTree.push(cloneNode);
      } else {
        targetElements = Array.from(parentNode.childNodes).map(toHTMLElement);
      }
    }

    return {
      wrappedDOMTree: parentDOMTree,
      targetElements,
    };
  }

  function wrappingElement(wrappingTree: HTMLElement[]): HTMLElement {
    let result = null;

    while (wrappingTree.length) {
      const htmlElement = wrappingTree.pop();
      result = wrappingTree[wrappingTree.length - 1].appendChild(htmlElement);
    }

    return result;
  }

  function extractOuterHTMLArray(elements: HTMLElement[]): HTMLString[] {
    if (!elements) return [];

    return elements.map((element) => element.outerHTML);
  }

  function divideToHTMLStringArray(originWrappingDOMTree: HTMLElement[], originPrintElements: HTMLElement[]): HTMLString[] {
    let result: HTMLElement[] = [];
    const copiedPrintElements = originPrintElements.slice();

    let millimeterToPX = Number(MILLIMETER_297_TO_PX);
    let lastParentChild = originWrappingDOMTree[originWrappingDOMTree.length - 1].cloneNode(false);

    while (copiedPrintElements.length) {
      const htmlElement = copiedPrintElements.shift();
      console.log(htmlElement.innerText);
      millimeterToPX += htmlElement.clientHeight;
      lastParentChild.appendChild(htmlElement.cloneNode(true));

      if (greaterThan297mm(millimeterToPX)) {
        result.push(toHTMLElement(lastParentChild));
        lastParentChild = originWrappingDOMTree[originWrappingDOMTree.length - 1].cloneNode(false);
        millimeterToPX = 0;
      }

      if (copiedPrintElements.length === 0) {
        result.push(toHTMLElement(lastParentChild));
      }
    }

    console.log(millimeterToPX);
    console.log(result.map((elem) => elem.childNodes));
    return extractOuterHTMLArray(result);
  }

  async function download(pdfFilename: `${string}.pdf`, mutableReferences: MutableRefObject<HTMLElement | null>[]) {
    if (mutableReferences.some((ref) => !ref)) throw Error("PDF 다운로드에 실패했습니다.");

    let HTMLContents: string[] = [];

    for (const ref of mutableReferences) {
      const rootElement = ref?.current;
      if (!rootElement) continue;

      const shouldPageBreak = greaterThan297mm(rootElement.clientHeight);
      if (!shouldPageBreak) {
        HTMLContents.push(rootElement.outerHTML);
        continue;
      }

      console.clear();
      console.log(Date.now());

      try {
        const { wrappedDOMTree, targetElements } = getPrintElementList(rootElement);

        const htmlStrings = divideToHTMLStringArray(wrappedDOMTree, targetElements);

        const result = HTMLContents.concat(htmlStrings);
        console.log(result);

        const data: ExportPdfRequestType = {
          contents: result,
          styles: copyStyle(),
        };

        const res = await localInstance.post<ArrayBuffer>(END_POINT, data, {
          responseType: "blob",
        });

        const blob = new Blob([res.data]);
        await downloadBlobData(pdfFilename, blob);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function downloadBlobData(filename: string, blob: Blob) {
    const downloadBlob = new Blob([blob]);
    const blobUrl = window.URL.createObjectURL(downloadBlob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  }

  function copyStyle() {
    let result = "";
    const linkStyles = top.document.querySelectorAll("style");

    const ignoreLinkSources = ["globals.css", "style.css", "reset.css"];

    linkStyles.forEach((style) => {
      if (ignoreLinkSources.includes(style.outerHTML)) return;
      result += style.innerHTML;
    });

    return result;
  }

  return {
    download: download,
  };
}
