/** @format */

import fs from 'fs';
import client from '../config/weaviate';

async function getJsonData(filePath: string) {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}

async function importArticles() {
  const myCollection = client.collections.get('NewsArticle');
  const data = await getJsonData('src/data/bbc_news.json');

  const result = await myCollection.data.insertMany(data);
  console.log('We just bulk inserted', result);
}

export { importArticles };
