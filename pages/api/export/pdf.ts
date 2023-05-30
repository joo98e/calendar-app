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

  const htmlContents = ["<div>page 1</div>", "<div>page 2</div>", "<div>page 3</div>"];

  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  await page.setContent(
    getHTMLTemplate({
      components: htmlContents,
    }),
    { waitUntil: ["domcontentloaded", "networkidle0"] }
  );

  const pdfBuffer = await page.pdf({
    format: "A4",
  });

  await browser.close();

  return res.send(pdfBuffer);
}

interface GetHTMLTemplateProps {
  components: string[];
  style?: string;
}

function getHTMLTemplate({ components = [], style = "" }: GetHTMLTemplateProps) {
  let result = "";

  components.forEach(
    (component) =>
      (result += `
    <div class="page break">
        ${component}
    </div>
  `)
  );

  return `
        <!DOCTYPE html>
        <html lang="ko">
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>HTML to PDF Example</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    * {margin: 0; padding: 0; border-spacing: 0;}

                    .page {
                        width: 210mm;
                        height: auto;
                        overflow: hidden;
                        background: transparent;
                        margin-top: -1px !important;
                        margin-bottom: -1px !important;
                    }
                    
                    @page {
                        size: A4;
                        margin: 16px;
                    }
                    
                    @media print {
                        .break::after {
                            content: ''; 
                            display: block;
                            page-break-after: always;
                            page-break-inside: avoid;
                            page-break-before: avoid;        
                        }
                    }
                    
                    ${style}
                    
                </style>
            </head>
            <body>
                ${result}
            </body>
        </html>
    `;
}
