/** @format */

import express from 'express';
import cors from 'cors';
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

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check Weaviate connection
    await client.collections.get('NewsArticle').exists();
    res.status(200).json({
      message: 'Alive!',
    });
  } catch (error) {
    console.error(`Healthcheck failed with ${(error as Error).message}`);
    res.status(503).json({
      message: 'Database connection failed!',
    });
  }
});

app.post('/search', async (req, res) => {
  const { query, alpha, startDate, endDate } = req.body;
  console.log('Received search request with the following data:', {
    query,
    alpha,
    startDate,
    endDate,
  });

  try {
    const newsArticleCollection = client.collections.get('NewsArticle');

    const generatePrompt = `
    Indentify the top 5 articles from the search result that would most likely get the user's attention or be considered the most important relatively to the search term. Consider factors such as global impact, relevance to current major events, and the potential to influence public opinion. For each article, include the title, link, publication date, and a brief summary explaining why it was picked. The format should be:

    Here are the top "5 or article count if less than 5" articles picked from search result considering factors such as global impact, relevance to current events, and the potential to influence public opinion:

    1. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
    2. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
    3. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
    4. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
    5. "Article Title" - "date and time" - Summary explaining why this article is important. - [Read more]"link".
  `;

    // Split the query string into an array of words
    const queryArray = query.split(' ');

    // Define date filter
    const dateFilters = Filters.and(
      newsArticleCollection.filter
        .byProperty('pubDate')
        .greaterOrEqual(startDate),
      newsArticleCollection.filter.byProperty('pubDate').lessOrEqual(endDate)
    );

    let combinedFilters;

    // Define combinedFilter for stricter keyword search if alpha is 0 - 0.2
    if (alpha === 0) {
      combinedFilters = Filters.and(
        dateFilters,
        Filters.or(
          newsArticleCollection.filter
            .byProperty('title')
            .containsAny(queryArray),
          newsArticleCollection.filter
            .byProperty('description')
            .containsAny(queryArray)
        )
      );
    } else {
      combinedFilters = dateFilters;
    }

    // Define generative hybrid search query parameters
    const performQuery = async (autoLimit: number) => {
      return await newsArticleCollection.generate.hybrid(
        query,
        {
          groupedTask: generatePrompt,
          groupedProperties: ['title', 'description', 'link', 'pubDate'],
        },
        {
          queryProperties: ['title', 'description'],
          alpha: alpha,
          limit: 35,
          autoLimit: autoLimit,
          filters: combinedFilters,
          fusionType: 'RelativeScore',
        }
      );
    };

    let result;
    try {
      result = await performQuery(10);
    } catch (error) {
      // Lower autolimit if query result exceeds openai limit and try query again
      if ((error as Error).message.includes("Invalid 'max_tokens'")) {
        console.log('Retrying with lower autoLimit...');
        result = await performQuery(5);
      } else {
        throw error;
      }
    }

    console.log('Weaviate query result:', result.generated);

    const filteredResult = {
      objects: result.objects.map((obj) => ({
        uuid: obj.uuid,
        ...obj.properties,
      })),
      generated: result.generated,
    };

    res.json(filteredResult);
  } catch (error) {
    console.error('Error during search request:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
