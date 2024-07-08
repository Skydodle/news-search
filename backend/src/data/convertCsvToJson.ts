/** @format */

import fs from 'fs';
import csv from 'csv-parser';

// Function to convert date to RFC3339 format
const convertToRFC3339 = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString();
};

const getOneMonthAgoDate = (): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
};

const convertCsvToJson = (csvFilePath: string, jsonFilePath: string) => {
  const results: any[] = [];
  const uniqueArticles: Set<string> = new Set();
  const oneMonthAgo = getOneMonthAgoDate();

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      const pubDate = new Date(data.pubDate);
      if (pubDate >= oneMonthAgo) {
        // Convert pubDate to RFC3339 format
        data.pubDate = convertToRFC3339(data.pubDate);

        // Check for duplicate titles
        if (!uniqueArticles.has(data.title)) {
          uniqueArticles.add(data.title);

          // Remove the guid property
          const { guid, ...rest } = data;
          results.push(rest);
        }
      }
    })
    .on('end', () => {
      fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
      console.log(`Converted CSV to JSON: ${jsonFilePath}`);
    });
};

// Usage
const csvFilePath = 'src/data/bbc_news.csv';
const jsonFilePath = 'src/data/bbc_news.json';
convertCsvToJson(csvFilePath, jsonFilePath);
