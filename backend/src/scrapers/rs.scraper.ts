import puppeteer from 'puppeteer';
import { BaseScraper, ScrapeResult } from './base.scraper';

export class RSScraper extends BaseScraper {
  name = "RS Components";

  async scrape(productName: string): Promise<ScrapeResult[]> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const results: ScrapeResult[] = [];

    try {
      const searchUrl = `https://sg.rs-online.com/web/c/?searchTerm=${encodeURIComponent(productName)}`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      // RS often redirects to product page if only 1 result, or shows a list
      const isProductPage = await page.$('.product-card'); 
      
      const items = await page.evaluate(() => {
        const productElements = document.querySelectorAll('tr.result-row, .product-card');
        return Array.from(productElements).slice(0, 3).map(el => {
          const priceStr = el.querySelector('.price, [data-testid="price-container"]')?.textContent || "0";
          const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
          const stock = el.querySelector('.stock, .availability')?.textContent?.trim() || "Unknown";
          const link = (el.querySelector('a') as HTMLAnchorElement)?.href || "";
          
          return {
            supplier: "RS Components",
            price,
            currency: "SGD",
            stock,
            link
          };
        });
      });

      results.push(...items);
    } catch (error) {
      console.error(`RS Scraper Error for ${productName}:`, error);
    } finally {
      await browser.close();
    }

    return results;
  }
}
