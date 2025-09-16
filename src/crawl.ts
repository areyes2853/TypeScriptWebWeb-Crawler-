// Add to crawl.ts
import { JSDOM } from "jsdom";

// Update getHTML to return the HTML string instead of just printing
export async function getHTML(url: string): Promise<string | null> {
  try {
    console.log(`Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "BootCrawler/1.0",
      },
    });

    if (response.status >= 400) {
      console.log(`Error: HTTP ${response.status} - ${response.statusText}`);
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      console.log(`Error: Response is not HTML. Content-Type: ${contentType}`);
      return null;
    }

    const htmlBody = await response.text();
    return htmlBody;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error fetching ${url}:`, error.message);
    } else {
      console.log(`Error fetching ${url}:`, error);
    }
    return null;
  }
}

// Helper function to check if URL is same domain
function isSameDomain(url1: string, url2: string): boolean {
  try {
    const domain1 = new URL(url1).hostname;
    const domain2 = new URL(url2).hostname;
    return domain1 === domain2;
  } catch (error) {
    return false;
  }
}

// Main crawling function with recursion
export async function crawlPage(
  baseURL: string,
  currentURL: string = baseURL,
  pages: Record<string, number> = {}
): Promise<Record<string, number>> {
  console.log(`\n🕷️  Crawling: ${currentURL}`);

  // STEP 1: Check if currentURL is same domain as baseURL
  if (!isSameDomain(baseURL, currentURL)) {
    console.log(`⏭️  Skipping external URL: ${currentURL}`);
    return pages;
  }

  // STEP 2: Get normalized version of currentURL
  const normalizedURL = normalizeURL(currentURL);
  console.log(`📝 Normalized: ${normalizedURL}`);

  // STEP 3: Check if we've already seen this page
  if (pages[normalizedURL]) {
    pages[normalizedURL]++;
    console.log(
      `🔄 Already seen ${normalizedURL} (count: ${pages[normalizedURL]})`
    );
    return pages;
  }

  // STEP 4: Add new page to our tracking object
  pages[normalizedURL] = 1;
  console.log(`✅ Added new page: ${normalizedURL}`);

  // STEP 5: Get HTML from current URL
  const html = await getHTML(currentURL);
  if (!html) {
    console.log(`❌ Failed to get HTML from: ${currentURL}`);
    return pages;
  }

  console.log(`📄 Successfully fetched HTML (${html.length} characters)`);

  // STEP 6: Extract all URLs from the HTML
  const foundURLs = getURLsFromHTML(html, baseURL);
  console.log(`🔗 Found ${foundURLs.length} links on this page`);

  // STEP 7: Recursively crawl each URL found
  for (const foundURL of foundURLs) {
    console.log(`🔍 Processing link: ${foundURL}`);
    // RECURSIVE CALL - this is where the magic happens!
    pages = await crawlPage(baseURL, foundURL, pages);
  }

  // STEP 8: Return the updated pages object
  console.log(`✨ Completed crawling: ${currentURL}`);
  return pages;
}

// Your existing helper functions
export function normalizeURL(url: string): string {
  try {
    const urlObj = new URL(url);
    let normalized = urlObj.hostname + urlObj.pathname;
    if (normalized.endsWith("/")) {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  } catch (error) {
    throw new Error(`Invalid URL: ${url}`);
  }
}

export function getURLsFromHTML(html: string, baseURL: string): string[] {
  const urls: string[] = [];
  const dom = new JSDOM(html);
  const anchorTags = dom.window.document.querySelectorAll("a");

  anchorTags.forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (href) {
      try {
        const absoluteURL = new URL(href, baseURL);
        urls.push(absoluteURL.href);
      } catch (error) {
        // Skip invalid URLs
      }
    }
  });

  return urls;
}
