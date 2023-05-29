import puppeteer from "puppeteer";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type HTMLToString = string;

export interface ExportPdfRequestType {
  filename: `${string}.pdf`;
  content: HTMLToString;
}

export default async function exportPdfHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(404).send({
      message: "this method is not allowed.",
    });
  }

  const { filename, content } = req.body as ExportPdfRequestType;
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
  await page.goto("http://localhost:3000/calendar");

  await page.setContent(
    `
      ${content}
    `,
    {
      waitUntil: "load",
      timeout: 5000,
    }
  );

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: 16,
      bottom: 16,
    },
    printBackground: true,
  });

  await page.close();

  return res.send(pdfBuffer);
}
