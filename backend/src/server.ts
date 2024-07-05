/** @format */

import express from 'express';
import weaviate, { WeaviateClient, Filters } from 'weaviate-client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_ENDPOINT as string,
  {
    authCredentials: new weaviate.ApiKey(
      process.env.WEAVIATE_API_KEY as string
    ),
    headers: {
      'X-Openai-Api-Key': process.env.OPENAI_API_KEY as string,
    },
  }
);

app.use(express.json());

/**
 * Converts a date in YYYY-MM-DD format to RFC3339 format
 * @param {string} date - The date in YYYY-MM-DD format
 * @returns {string} - The date in RFC3339 format
 */
const convertToRFC3339 = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString();
};

app.post('/search', async (req, res) => {
  const { query, alpha, limit, startDate, endDate } = req.body;

  try {
    const newsArticleCollection = client.collections.get('NewsArticle');

    const generatePrompt = `
    Please identify the top 5 articles that would most likely get the world's attention or be considered the most important. For each article, include the title, link, publication date, and a brief summary explaining why it was picked. Consider factors such as global impact, relevance to current major events, and the potential to influence public opinion. The format should be:

    1. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
    2. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
    3. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
    4. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
    5. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
  `;

    // prettier-ignore
    const filters = Filters.and(
      newsArticleCollection.filter.byProperty('pubDate').greaterOrEqual(startDate),
      newsArticleCollection.filter.byProperty('pubDate').lessOrEqual(endDate)
    );

    const result = await newsArticleCollection.generate.hybrid(
      query,
      {
        groupedTask: generatePrompt,
        groupedProperties: ['title', 'description', 'link', 'pubDate'],
      },
      {
        alpha: alpha,
        limit: limit,
        filters: filters,
      }
    );

    const filteredResult = {
      objects: result.objects.map((obj) => ({
        uuid: obj.uuid,
        ...obj.properties,
      })),
      generated: result.generated,
    };
    console.log(filteredResult);

    res.json(filteredResult);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
