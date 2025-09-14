function main() {
  const args = process.argv.slice(2);
  if (args.length < 1)  {
    console.error("Usage: ts-node src/index.ts <URL>");
    process.exit(1);
  }
  if (args.length > 1) {
    console.error("Error: Too many arguments provided.");
    console.error("Usage: ts-node src/index.ts <URL>");
    process.exit(1);
  }
  const baseURL = args[0];
  console.log(`Crawling URL: ${baseURL}`);
  console.log("Crawler is starteng...");
  // Start crawling logic here, e.g., call a crawl function with baseURL
  // crawl(baseURL);
  // ?
  process.exit(0);
}

main();

console.log("Hello, World!");
