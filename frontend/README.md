# 🎨 News Search - Frontend 🎨

News Search is a React application powered by Next.js, which enables you to search and display BBC News articles interactively. This document provides setup instructions for the frontend, component details, and maintenance procedures.

## 🚀 Getting Started

Follow these steps to set up the frontend:

1. Ensure Node.js version `>=18.18.2` is installed. If not, download and install it from [Node.js](https://nodejs.org/).
2. Run `npm install` to install all required modules.
3. Adjust the backend endpoint in the `index.tsx` file according to your setup (default is localhost:4000).
4. Start the application with `npm run dev`.

### 🐳 Using Docker

The frontend is dependent on the backend database and server to be up and running. If you would like to use Docker, please follow the main [README.md](../README.md) to spin up both backend and frontend with docker-compose.


## 🔗 Article Schema

All type interfaces are centralized in `types.ts`.
The `Article` interface in the `types.ts` defines the article data displayed in the frontend. To add or remove fields, adjust the interface in `types.ts` accordingly, and ensure the backend also provides these fields.

```ts
// Define the properties of the Article type
export interface Article {
    uuid: string;
    title: string;
    description: string;
    link: string;
    pubDate: string;
}

// Define the parameters type for handleSend query
export type HandleSendParams = {
    inputValue: string;
    alpha: number;
    startDate: string;
    endDate: string;
};
```

## 🔗 Code Maintenance

-   Run `npx prettier --write .` to format the codebase.
-   Lint the codebase with `npx eslint <FILENAME>`.

## 🎨 Styling

The application employs Tailwind CSS and global CSS classes for styling. Images and animations used in the demo are located in the public directory.

## 📚 Component Documentation

Below is a brief description of the key components:

-   `index.tsx`
    Contains a Sidebar for inputting and managing queries, a Main Content area for displaying results. The layout is responsive, with a collapsible sidebar for smaller screens.

-   `SideBarCard.tsx`
    A collapsible sidebar that displays instructions, a console for sending queries (ConsoleCard).

-   `ConsoleCard.tsx`
    Accepts a user query, displays search suggestions, provide alpha weight slider filter, week filter, and provides tooltip instructions. When a query is sent, it communicates with the parent component using the onSend function.

-   `GenerativeCard.tsx`
    Shows generated top 5 article summaries from the backend prompt using a typewriter effect and a loading spinner while waiting for fetched results.

-   `ResultsCard.tsx`
    Creates a header for the results section and generate Article cards.

-   `ProductCard.tsx`
    Displays articles as cards with details.
