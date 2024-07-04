/** @format */

import client from './config/weaviate';
import createSchema from './schema/createSchema';
import { importArticles } from './data/importDataToWeaviate';

const runSetup = async () => {
  // connect to Weaviate cloud db
  const response = await client.isReady();
  console.log('Weaviate is ready:', response);

  // create schema
  await createSchema();

  // Import JSON data to Weaviate collection
  await importArticles();
};

runSetup();
