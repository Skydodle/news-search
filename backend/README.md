# 🔧 News Search - Backend 🔧

Welcome to the backend documentation for the News Search Demo, designed to guide you through setting up, managing dependencies, and running this project.

## 🗂️ Dataset

The file [`bbc_news.json`](./data/bbc_news.json) contained in the `data` folder is a filtered extract of the original dataset and intended to be imported into a Weaviate Cluster. The original dataset contains years of data and was trimmed down to the latest 1 month data in `convertCsvToJson.ts` for the purpose of this demo. This file serves as the primary data source for the web app, featuring title, publication date, description, and guid of the news articles. 

The schema definitions are defined in `createSchema.ts` in the `schema` folder. it's currently text-embedded with `text2VecOpenAI` vectorizer and using the `openAI` for generative module.
Custom module configuration can be done within `text2VecOpenAI()` and `openAI()`.

## 📦 Setup & Requirements

### 🐳 Using Docker (Only for backend)

You can also use Docker to setup the backend. If you're not familiar with Docker you can read more about it here (https://docker-curriculum.com/)

Inside the backend folder, use these commands:

1. **Set environment variables:**
- The following environment variables need to be set
- ```WEAVIATE_ENDPOINT=your-weaviate-url```
- ```WEAVIATE_API_KEY=your-weaviate-api-key```
- ```OPENAI_API_KEY=your-openai-api-key```
> Use the `example.env` file inside the backend folder, make a copy of it as `.env` and set your variables.
> Note that if you're using the GPT-3.5 model (by default with JS/TS client v3), ensure your OpenAI key has access. You can change the `model_name` variable to `gpt-4` inside the `createSchema.ts` script, additional cost with OpenAI would apply.

2. **Build Docker image** 
-`docker build -t weaviate-news-search-backend .`

3. **Run the Docker container for the backend**
   `docker run -d -p 4000:4000 --name weaviate-news-search-backend weaviate-news-search-backend`

4. **Verify the container is running**
-  `docker ps`


> Note that the frontend needs to access the dockerized applications, since they exist within their own network. If you want to use Docker for the whole demo, I recommend following the main [README.md](../README.md).

### ⚙️ Manual Installation

The following steps guide you through setting up the backend manually

1. **Set up your Weaviate cluster:**
- **OPTION 1** Create a cluster in WCD (for more details, refer to the [Weaviate Cluster Setup Guide](https://weaviate.io/developers/wcs/guides/create-instance))
- **OPTION 2** Use Docker-Compose to setup a cluster locally [Weaviate Docker Guide](https://weaviate.io/developers/weaviate/installation/docker-compose)

2. **Set environment variables:**
- The following environment variables need to be set
- ```WEAVIATE_ENDPOINT=your-weaviate-url```
- ```WEAVIATE_API_KEY=your-weaviate-api-key```
- ```OPENAI_API_KEY=your-openai-api-key```

3. **Install dependencies:**
- `npm install`

5. **Import dataset to WCD:**
- `npm run setup:db:log`
- This will create the WCD connection and seed the database schema with the dataset JSON
- Check the `output.log` file in backend root folder to watch the database setup progress

6. **Start the Node Express server:**
- `npm run start:server`




