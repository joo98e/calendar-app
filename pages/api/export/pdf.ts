import puppeteer from "puppeteer";
import type { NextApiRequest, NextApiResponse } from "next";

type HTMLToString = string;
type HTMLStyleToString = string;

export interface ExportPdfRequestType {
  filename: `${string}.pdf`;
  content: HTMLToString;
  styleContent: HTMLStyleToString;
}

export default async function exportPdfHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(404).send({
      message: "this method is not allowed.",
    });
  }

  const { filename, content, styleContent } = req.body as ExportPdfRequestType;
  if (!filename || !content) {
    return res.status(400).send({
      message: "잘못된 인수입니다.",
    });
  }

  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();
  await page.emulateMediaType("screen");

  await page.setContent(
    `
      ${content}
    `,
    {
      waitUntil: "load",
      timeout: 5000,
    }
  );

  await page.addStyleTag({
    content: `
      padding : 16px;
      box-sizing: border-box;
    
      ${styleContent}
    `,
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: 32,
      bottom: 32,
      left: 32,
      right: 32,
    },
  });

  await page.close();

  return res.send(pdfBuffer);
}
