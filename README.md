# News Search
> 💡 Inspiration utilized from Weaviate's open-sourced [Health Search Demo](https://github.com/weaviate/healthsearch-demo)

## 🎯 Overview
Welcome to News Search, a web application that enables users to search and filter news articles from BBC's RSS feed using a combination of keyword and vector search. This project uses Weaviate, a vector search database, along with a TypeScript React frontend and an Node.js & Express backend.

[![Weaviate](https://img.shields.io/static/v1?label=%E2%9D%A4%20made%20with&message=Weaviate&color=green&style=flat-square)](https://weaviate.io/) [![Docker support](https://img.shields.io/badge/Docker_support-%E2%9C%93-4c1?style=flat-square&logo=docker&logoColor=white)](https://docs.docker.com/get-started/) [![Weaviate](https://img.shields.io/static/v1?label=version&message=v1.1&color=pink&style=flat-square)](https://weaviate.io/)

## 🚀 Features

News Search relies on Weaviate's [Generative search](https://weaviate.io/developers/weaviate/search/generative) hybrid model to conduct search between pure keyword search, hybrid search, or pure vector semantic search using the [alpha](https://weaviate.io/developers/weaviate/search/hybrid#balance-keyword-and-vector-search) property in the query, combine with Weaviate's [OpenAI module](https://weaviate.io/developers/weaviate/modules/reader-generator-modules/generative-openai) integration and [JS/TS v3 Client Library](https://weaviate.io/developers/weaviate/client-libraries/typescript)  to produce a powerful semantic query with generative summary result.

- **Natural Language Query**: Enable search in natural language to query for news articles.
- **Hybrid Search Slider**: Adjust the alpha weight between keyword, hybrid, and vector search.
- **Date Range Filter**: Select a specific week to filter news articles.
- **Generative Summaries**: Get a summary of the top 5 articles picked from the search result. Generated by the Weaviate OpenAI module with consideration to influence of public opinion and relativity to major current events.

## 📀 Dataset

The dataset use for News Search is the [BBC News RSS Feed](https://www.kaggle.com/datasets/gpreda/bbc-news/data) on Kaggle.
- The dataset comes in CSV format. You can download for latest data and use the `convertCsvToJson.ts` in the `backend` folder to transform it and seed your Weaviate database
- Alternatively, you can write a script for daily cron job to download dataset daily, transform, and update the database, and it would be a LIVE up-to-date news app!
  
## 🛠️ Prerequisites
1. Ensure you have the following installed on your local machine:
   - [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/)
   - [Node.js (v18.18.2)](https://nodejs.org/)
   - [NPM](https://www.npmjs.com/)

2. This project uses Weaviate Cloud's Sandbox Cluster (14 day free trial) for quick and easy setup:
   - [Weaviate Quickstart Guide](https://weaviate.io/developers/weaviate/quickstart)
   - [Weaviate Cloud (WCD)](https://console.weaviate.cloud/)
   - Be sure to take note of your Weaviate instance's url and API key once the sandbox cluster is spinned up.

3. The generative search uses the OpenAI module that requires OpenAI API key:
   - [Sign Up with OpenAI API](https://platform.openai.com/docs/overview): $18 free credit on first sign up
   - Create an OpenAI API key and take note of it

## 🐳 Quickstart with Docker

You can use Docker to setup the demo in one line of code! If you're not familiar with Docker you can read more about it here (https://docker-curriculum.com/)

1. **Set environment variables:**
- The following environment variables need to be set
- ```WEAVIATE_ENDPOINT=your-weaviate-url```
- ```WEAVIATE_API_KEY=your-weaviate-api-key```
- ```OPENAI_API_KEY=your-openai-api-key```
> Use the `example.env` file inside the backend folder, make a copy of it as `.env` and set your variables.
> Note that if you're using the GPT-4 model (by default), ensure your OpenAI key has access. You can change the `model_name` variable to `gpt-3.5-turbo` inside the `createSchema.ts` script.

1. **Use docker compose**
-  `docker-compose up --build`

2. **Access the frontend on:**
- `localhost:3000`

## 📚 Getting Started

To kick-start with the Healthsearch Demo, please refer to the READMEs in the `Frontend` and `Backend` folders:

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 💡 Usage

Follow these steps to use the News Search App:

1. Set up the Weaviate database, Node Express backend, and the React frontend by following the instructions in their respective READMEs.
2. Launch the database, backend server, and the frontend application.
3. Use the interactive frontend to input your natural language query to search for news articles on current events of your interest.
4. The frontend sends the query to the backend along with your chosen filters that dictate whether it's closer to a keyword, hybrid, or vector search.
5. The backend sends the parameterized query to the Weaviate database with a generative prompt to fetch relevant articles based on the user query.
6. The frontend displays the articles from search results and also provide you with top 5 articles picked by OpenAI along with summaries.

