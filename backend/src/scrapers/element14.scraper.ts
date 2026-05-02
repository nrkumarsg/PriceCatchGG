import puppeteer from 'puppeteer';
import { BaseScraper, ScrapeResult } from './base.scraper';

export class Element14Scraper extends BaseScraper {
  name = "Element14";

  async scrape(productName: string): Promise<ScrapeResult[]> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const results: ScrapeResult[] = [];

    try {
      const searchUrl = `https://sg.element14.com/w/c/?st=${encodeURIComponent(productName)}`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      const items = await page.evaluate(() => {
        const productElements = document.querySelectorAll('.productListItem, .productData');
        return Array.from(productElements).slice(0, 3).map(el => {
          const priceStr = el.querySelector('.price, .standardPrice')?.textContent || "0";
          const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
          const stock = el.querySelector('.availability, .stock')?.textContent?.trim() || "In Stock";
          const link = (el.querySelector('a') as HTMLAnchorElement)?.href || "";
          
          return {
            supplier: "Element14",
            price,
            currency: "SGD",
            stock,
            link
          };
        });
      });

      results.push(...items);
    } catch (error) {
      console.error(`Element14 Scraper Error for ${productName}:`, error);
    } finally {
      await browser.close();
    }

    return results;
  }
}
