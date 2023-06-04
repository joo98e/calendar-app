import puppeteer from "puppeteer";
import type { NextApiRequest, NextApiResponse } from "next";

type HTMLToString = string;
type CSSToString = string;

export interface ExportPdfRequestType {
  contents: HTMLToString[];
  styles: CSSToString;
}

export default async function exportPdfHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).send({
      message: "this method is not allowed.",
    });
  }

  const { contents, styles } = req.body as ExportPdfRequestType;
  if (!contents) {
    return res.status(400).send({
      message: "잘못된 인수입니다.",
    });
  }

  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  const html = getHTMLTemplate({
    contents: contents,
    styles: styles,
  });

  await page.setContent(html, { waitUntil: ["domcontentloaded", "networkidle0"] });

  const pdfBuffer = await page.pdf({
    format: "A4",
    headerTemplate: "<div style='color:red; font-size:24px;'>header</div>",
    footerTemplate: "<div style='color:red; font-size:24px;'>footer</div>",
    displayHeaderFooter: true,
    preferCSSPageSize: true,
    printBackground: true,
  });

  await browser.close();

  return res.send(pdfBuffer);
}

interface GetHTMLTemplateProps {
  contents: string[];
  styles?: string;
}

interface GetHTMLTemplateProps {
  contents: string[];
  styles?: string;
}

function getHTMLTemplate({ contents = [], styles = "" }: GetHTMLTemplateProps) {
  let result = "";

  contents.forEach(
    (component) =>
      (result += `
      <main>
        <div class="page print-break">
          ${component}
        </div>
      </main>      
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
                  ${styles}
                </style>
                <style>
                
                    * {margin: 0; padding: 0; border-spacing: 0; page-break-after: inherit; page-break-inside: inherit; page-break-before: inherit;}
                    html, body {
                      width:auto;
                      height:auto;
                    }
                    
                    main {
                      margin: 24px 0;
                    }
                    
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
                        .print-break::after {
                            content: ''; 
                            display: block;
                            page-break-after: always;
                            page-break-inside: avoid;
                            page-break-before: avoid;        
                        }
                    }
                </style>
            </head>
            <body>
              ${result}
            </body>
        </html>
    `;
}
