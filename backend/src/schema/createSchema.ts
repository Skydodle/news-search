/** @format */

import client from '../config/weaviate';
import weaviate from 'weaviate-client';

// Define the schema for 'NewsArticle'
const collectionObj = {
  name: 'NewsArticle',
  description: 'RSS Feeds from BBC News',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
      description: 'The title of the article',
    },
    {
      name: 'description',
      dataType: 'text' as const,
      description: 'The description or content of the article',
    },
    {
      name: 'link',
      dataType: 'text' as const,
      description: 'The URL to the full article',
    },
    {
      name: 'pubDate',
      dataType: 'date' as const,
      description: 'The publication date of the article',
    },
  ],
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI(),
  generative: weaviate.configure.generative.openAI(),
};

// Function to check if a collection exists and delete it if it does
const checkAndDeleteCollection = async (collectionName: string) => {
  const collections = await client.collections.listAll();
  const collectionExists = collections.some(
    (cls: { name: string }) => cls.name === collectionName
  );

  if (collectionExists) {
    console.log(`Collection ${collectionName} exists. Deleting...`);
    await client.collections.delete(collectionName);
    console.log(`Collection ${collectionName} deleted.`);
  }
};

// Create the schema in Weaviate
const createSchema = async () => {
  const collectionName = 'NewsArticle';
  await checkAndDeleteCollection(collectionName);
  const newCollection = await client.collections.create(collectionObj);
  console.log('Schema created:', newCollection);
};

export default createSchema;
