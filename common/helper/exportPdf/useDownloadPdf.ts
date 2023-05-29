import axios from "axios";
import { useRef } from "react";
import type { ExportPdfRequestType } from "@api/export/pdf";

export default function useDownloadPdf() {
  const ref = useRef<HTMLDivElement>();
  const END_POINT = "/api/export/pdf" as const;
  const localInstance = axios.create({
    headers: {},
  });

  async function run(data: ExportPdfRequestType) {
    try {
      const res = await localInstance.post<Blob>(END_POINT, data, {
        responseType: "blob",
      });

      await downloadBlobData(data.filename, res.data);
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

  return {
    ref: ref,
    run: run,
  };
}
