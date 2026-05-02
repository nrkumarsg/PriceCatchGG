import { RSScraper } from '../scrapers/rs.scraper';
import { Element14Scraper } from '../scrapers/element14.scraper';
import { ScrapeResult } from '../scrapers/base.scraper';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export const searchProducts = async (productName: string): Promise<ScrapeResult[]> => {
  const cacheKey = `search:${productName}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log(`Cache hit for ${productName}`);
    return JSON.parse(cached);
  }

  const scrapers = [
    new RSScraper(),
    new Element14Scraper()
  ];

  // Run scrapers concurrently with individual retries
  const results = await Promise.all(
    scrapers.map(async (scraper) => {
      let attempts = 0;
      const maxAttempts = 2;
      while (attempts < maxAttempts) {
        try {
          return await scraper.scrape(productName);
        } catch (error) {
          attempts++;
          console.error(`Retry ${attempts} for ${scraper.name}`);
          if (attempts === maxAttempts) return [];
        }
      }
      return [];
    })
  );

  const flatResults = results.flat();
  
  if (flatResults.length > 0) {
    await redis.set(cacheKey, JSON.stringify(flatResults), 'EX', 3600); // 1 hour cache
  }

  return flatResults;
};
