const express = require('express');
const router = express.Router(); // Initialize router
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

router.post('/get-calories', async (req, res) => {
  const { item } = req.body; // e.g., "chicken,paneer"

  if (!item) {
    return res.status(400).json({ error: 'Item is required' });
  }

  try {
    const items = item.split(',').map(i => i.trim());
    const calorieData = [];

    const chatSession = model.startChat({ generationConfig, history: [] });

    for (const singleItem of items) {
      const prompt = `Provide the calorie content of 100g of ${singleItem} as a single number (e.g., 165).`;
      const result = await chatSession.sendMessage(prompt);
      const responseText = result.response.text().trim();

      console.log(`Raw response for ${singleItem}:`, responseText);

      const calories = parseFloat(responseText.match(/\d+(\.\d+)?/)?.[0]) || 0;
      calorieData.push({ item: singleItem, calories });
    }

    res.json(calorieData);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch data from Gemini API' });
  }
});

module.exports = router;