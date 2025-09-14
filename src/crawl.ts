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
console.log(normalizeURL("https://blog.boot.dev/path/")); // blog.boot.dev/path
console.log(normalizeURL("https://blog.boot.dev/path")); // blog.boot.dev/path
console.log(normalizeURL("http://blog.boot.dev/path/")); // blog.boot.dev/path
console.log(normalizeURL("http://blog.boot.dev/path"));   