import React from 'react';
import { ResultCardProps } from '@/types/types';
import ArticleCard from './ArticleCard';

const ResultsCard: React.FC<ResultCardProps> = ({
    articles,
    searchTerm,
    filters,
}) => {
    const formatDate = (dateStr: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    };
    return (
        <div
            className="flex flex-col p-6 items-center"
            style={{ maxHeight: '730px' }}
        >
            {/* Header Section */}
            {searchTerm && (
                <div className="w-full mb-4 flex items-center">
                    <h2 className="text-4xl font-bold font-roboto text-blue-400 mr-4">
                        NEWS
                    </h2>
                    <p className="text-xl text-gray-700 mr-4">
                        <span className="font-semibold font-merriweather">
                            {searchTerm}
                        </span>
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold font-merriweather">
                            {formatDate(filters.startDate)} to{' '}
                            {formatDate(filters.endDate)}
                        </span>
                    </p>
                </div>
            )}
            <div className="w-full border-b-2 border-black mb-4"></div>

            {/* Scrollable Content Section */}
            <div className="w-full flex-grow p-6 space-y-4 overflow-y-auto">
                {articles &&
                    articles.map((article, index) => (
                        <ArticleCard key={index} article={article} />
                    ))}
            </div>
        </div>
    );
};

export default ResultsCard;
