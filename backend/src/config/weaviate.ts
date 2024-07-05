/** @format */

import weaviate, { WeaviateClient } from 'weaviate-client';
import dotenv from 'dotenv';

dotenv.config();

// Connect to WCD instance
const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_ENDPOINT as string,
  {
    authCredentials: new weaviate.ApiKey(
      process.env.WEAVIATE_API_KEY as string
    ),
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY as string,
    },
    timeout: { init: 30, query: 300, insert: 300 },
  }
);

export default client;
