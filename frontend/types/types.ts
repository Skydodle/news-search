// Define the parameters type for handleSend
export type HandleSendParams = {
    inputValue: string;
    alpha: number;
    startDate: string;
    endDate: string;
};

// Define the properties of the SidebarCard component
export interface SidebarCardProps {
    onSend: (params: HandleSendParams) => void;
    loading: boolean;
    selectedArticle: Article | null;
    apiStatus: string;
    isSidebarCollapsed: boolean;
}

// Define the properties of the Article type
export interface Article {
    uuid: string;
    title: string;
    description: string;
    link: string;
    pubDate: string;
}

// Define the properties of the ResultCard component
export interface ResultCardProps {
    articles: Article[] | null;
    searchTerm: string;
    filters: {
        alpha: number;
        startDate: string;
        endDate: string;
    };
}

// Define the properties of the ArticleCard component
export interface ArticleCardProps {
    article: Article | null;
}

// Define the properties of the ConsoleCard component
export interface ConsoleCardProps {
    onSend: (params: HandleSendParams) => void;
    loading: boolean;
}

// Define the properties of the GenerativeCard component
export interface GenerativeCardProps {
    text: string;
    loading: boolean;
}
