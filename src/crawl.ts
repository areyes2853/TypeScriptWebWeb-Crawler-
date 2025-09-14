 import { JSDOM } from "jsdom";

 // Remove or comment out this global variable when testing
// const htmlContent = `<html>...`
 
interface ExtractedPageData {
  url: string;
  h1: string;
  first_paragraph: string;
  outgoing_links: string[];
  image_urls: string[];
}

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

export function extractPageData(
  html: string,
  pageURL: string
): ExtractedPageData {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Extract H1 (reusing your existing logic)
  const h1 = document.querySelector("h1")?.textContent || "";

  // Extract first paragraph (reusing your existing logic)
  const firstParagraph = document.querySelector("p")?.textContent || "";

  // Extract outgoing links (reusing your existing logic)
  const outgoingLinks: string[] = [];
  const anchorTags = document.querySelectorAll("a");
  anchorTags.forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (href) {
      try {
        const absoluteURL = new URL(href, pageURL);
        outgoingLinks.push(absoluteURL.href);
      } catch (error) {
        console.warn(`Invalid URL found: ${href}`);
      }
    }
  });

  // Extract image URLs (new logic for images)
  const imageURLs: string[] = [];
  const imageTags = document.querySelectorAll("img");
  imageTags.forEach((img) => {
    const src = img.getAttribute("src");
    if (src) {
      try {
        const absoluteURL = new URL(src, pageURL);
        imageURLs.push(absoluteURL.href);
      } catch (error) {
        console.warn(`Invalid image URL found: ${src}`);
      }
    }
  });

  // Return the combined data object
  return {
    url: pageURL,
    h1: h1,
    first_paragraph: firstParagraph,
    outgoing_links: outgoingLinks,
    image_urls: imageURLs,
  };
}