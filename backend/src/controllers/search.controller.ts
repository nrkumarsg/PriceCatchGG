import { Request, Response } from 'express';
import { normalizeProductName } from '../services/ai.service';
import { extractTextFromImage } from '../services/vision.service';
import { searchProducts } from '../services/scraper.service';

export const handleSearch = async (req: Request, res: Response) => {
  try {
    const { query, image } = req.body;
    let searchTerm = query;

    if (image) {
      console.log("Processing image search...");
      const extractedText = await extractTextFromImage(image);
      searchTerm = extractedText || query;
    }

    if (!searchTerm) {
      return res.status(400).json({ error: "Search query or image required" });
    }

    console.log(`Normalizing search term: ${searchTerm}`);
    const normalizedProduct = await normalizeProductName(searchTerm);
    console.log(`Searching for: ${normalizedProduct}`);

    const results = await searchProducts(normalizedProduct);

    res.json({
      product: normalizedProduct,
      results: results
    });
  } catch (error) {
    console.error("Search controller error:", error);
    res.status(500).json({ error: "Internal server error during search" });
  }
};
