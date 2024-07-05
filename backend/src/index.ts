/** @format */

import client from './config/weaviate';
import createSchema from './schema/createSchema';
import { importArticles } from './data/importDataToWeaviate';

const runDBSetup = async () => {
  try {
    // Connect to Weaviate Cloud db
    const response = await client.isReady();
    console.log('Weaviate is ready:', response);

    // Create schema
    await createSchema();

    // Import JSON data to Weaviate collection
    await importArticles();
  } catch (error) {
    console.error('Error during setup:', error);
  } finally {
    // Close Weaviate connection
    await client.close();
    console.log('Weaviate client connection closed.');
  }
};

runDBSetup();
