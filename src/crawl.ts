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
   console.log(dom.window.document.querySelector("p")?.textContent);
   return dom.window.document.querySelector("p")?.textContent || "";
 }