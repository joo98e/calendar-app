import puppeteer from "puppeteer";

async function handler(req, res) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/export/pdf");
  await page.emulateMediaType("screen");

  const pdfBuffer = await page.pdf({ format: "A4" });

  res.send(pdfBuffer);
  await browser.close();
}

export default handler;
