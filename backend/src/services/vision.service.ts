import axios from 'axios';

export const extractTextFromImage = async (base64Image: string): Promise<string> => {
  try {
    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    if (!apiKey) throw new Error("Vision API Key missing");

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        requests: [
          {
            image: { content: base64Image.split(',')[1] || base64Image },
            features: [{ type: "TEXT_DETECTION" }],
          },
        ],
      }
    );

    const detections = response.data.responses[0].textAnnotations;
    if (detections && detections.length > 0) {
      return detections[0].description.replace(/\n/g, ' ').trim();
    }
    return "";
  } catch (error) {
    console.error("Vision API error:", error);
    return "";
  }
};
