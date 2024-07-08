import React from 'react';
import { ArticleCardProps } from '@/types/types';

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    if (!article) return null;

    return (
        <div
            className="bg-white rounded-lg p-4 w-full font-mono animate-pop-in relative cursor-pointer hover:brightness-110 hover:shadow-md group"
            onClick={() => window.open(article.link, '_blank')}
        >
            <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold font-merriweather group-hover:underline">
                    {article.title}
                </h2>
                <p className="text-sm font-roboto">{article.description}</p>
                <p className="text-sm text-gray-500">
                    {new Date(article.pubDate).toLocaleString()}
                </p>
            </div>
            <div className="w-full border-b border-gray-300 mt-2"></div>
        </div>
    );
};

export default ArticleCard;
