 import { JSDOM } from "jsdom";

 // Remove or comment out this global variable when testing
 // const htmlContent = `<html>...`

 export function normalizeURL(url: string): string {
   try {
     const urlObj = new URL(url);
     let normalized = urlObj.hostname + urlObj.pathname;

     // Remove trailing slash
     if (normalized.endsWith("/")) {
       normalized = normalized.slice(0, -1);
     }

     return normalized;
   } catch (error) {
     throw new Error(`Invalid URL: ${url}`);
   }
 }

 export function getH1FromHTML(html: string): string {
   // FIXED: Use 'html' parameter, not global htmlContent
   const dom = new JSDOM(html);
   console.log(dom.window.document.querySelector("h1")?.textContent);
   return dom.window.document.querySelector("h1")?.textContent || "";
 }

 export function getFirstParagraphFromHTML(html: string): string {
   // FIXED: Use 'html' parameter, not global htmlContent
   const dom = new JSDOM(html);
   console.log(dom.window.document.querySelector("main p")?.textContent);
   return dom.window.document.querySelector("main p")?.textContent || "";
 }

export function getURLsFromHTML(html: string, baseURL: string): string[] {
  const urls: string[] = [];
  try {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const anchors = doc.querySelectorAll("a");

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href) return;

      try {
        const absoluteURL = new URL(href, baseURL).toString();
        urls.push(absoluteURL);
      } catch (err) {
        console.error(`invalid href '${href}':`, err);
      }
    });
  } catch (err) {
    console.error("failed to parse HTML:", err);
  }
  return urls;
}

export function getImagesFromHTML(html: string, baseURL: string): string[] {
  const imageURLs: string[] = [];
  try {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const images = doc.querySelectorAll("img");

    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (!src) return;

      try {
        const absoluteURL = new URL(src, baseURL).toString();
        imageURLs.push(absoluteURL);
      } catch (err) {
        console.error(`invalid src '${src}':`, err);
      }
    });
  } catch (err) {
    console.error("failed to parse HTML:", err);
  }
  return imageURLs;
}