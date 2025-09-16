// main.ts
import { crawlPage } from "./crawl";

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("Error: No website provided");
    console.log("Usage: npm run start <BASE_URL>");
    process.exit(1);
  }

  if (args.length > 1) {
    console.log("Error: Too many arguments provided");
    console.log("Usage: npm run start <BASE_URL>");
    process.exit(1);
  }

  const baseURL = args[0];

  console.log(`🚀 Starting crawl of: ${baseURL}`);
  console.log("=".repeat(50));

  try {
    // Start the recursive crawling process
    const pages = await crawlPage(baseURL);

    console.log("\n" + "=".repeat(50));
    console.log("🎉 CRAWL COMPLETE!");
    console.log("=".repeat(50));

    // Display results
    const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1]);

    console.log(`\n📊 Found ${Object.keys(pages).length} unique pages:`);
    console.log("-".repeat(50));

    sortedPages.forEach(([url, count]) => {
      console.log(`${count}x: ${url}`);
    });

    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Crawl failed:", error.message);
    } else {
      console.error("❌ Crawl failed:", error);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("💥 Fatal error:", error);
  process.exit(1);
});
