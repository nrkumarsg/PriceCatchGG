export interface ScrapeResult {
  supplier: string;
  price: number;
  currency: string;
  stock: string;
  link: string;
}

export abstract class BaseScraper {
  abstract name: string;
  abstract scrape(productName: string): Promise<ScrapeResult[]>;
}
