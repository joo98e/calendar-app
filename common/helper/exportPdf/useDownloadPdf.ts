import axios from "axios";
import { useRef } from "react";

export default function useDownloadPdf() {
  const ref = useRef<HTMLDivElement>();
  const END_POINT = "/api/export/pdf" as const;
  const localInstance = axios.create({
    headers: {},
  });

  async function run(filename: string, content: string) {
    try {
      const res = await localInstance.post<ArrayBuffer>(
        END_POINT,
        {
          filename: filename,
          content: content,
          styleContent: copyStyle(),
        },
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([res.data]);
      await downloadBlobData(filename, blob);
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
    const TOP = window.top;
    const linkStyles = TOP.document.querySelectorAll("style");

    linkStyles.forEach((style) => {
      result += style.innerHTML;
    });

    return result;
  }

  return {
    ref: ref,
    run: run,
  };
}
