import axios from "axios";
import { MutableRefObject } from "react";
import { ExportPdfRequestType } from "@api/export/pdf";

export default function useDownloadPdf() {
  const END_POINT = "/api/export/pdf" as const;
  const localInstance = axios.create({
    headers: {},
  });

  async function download(pdfFilename: `${string}.pdf`, mutableReferences: MutableRefObject<HTMLElement | null>[]) {
    if (mutableReferences.some((ref) => !ref)) throw Error("PDF 다운로드에 실패했습니다.");

    const contents = mutableReferences.map((ref) => ref?.current?.outerHTML);

    try {
      const data: ExportPdfRequestType = {
        contents: contents,
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
