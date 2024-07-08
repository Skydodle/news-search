// Import React and other necessary dependencies
import React, { useState, useEffect } from 'react';
import ResultCard from '../components/ResultsCard';
import GenerativeCard from '../components/GenerativeCard';
import SidebarCard from '../components/SidebarCard';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { HandleSendParams, Article } from '@/types/types';

export default function Home() {
    // State variables for data manipulation and UI control
    const [loading, setLoading] = useState(false); // Loading state
    const [apiStatus, setApiStatus] = useState<string>('Offline'); // API status
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar state

    // State variables for article data manipulation
    const [results, setResults] = useState<Article[]>([]); // Search results
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(
        null,
    );

    // State variables for search term and filters
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filters, setFilters] = useState({
        alpha: 0.5,
        startDate: '2024-06-28',
        endDate: '2024-07-05',
    });

    // State variable for generative search
    const [generativeResult, setGenerativeResult] = useState<string>(
        'Welcome to News Search!',
    );

    // Function for checking the health of the API
    const checkApiHealth = async () => {
        try {
            // Change ENDPOINT based on your setup (Default to localhost:4000)
            const response = await fetch('http://localhost:4000/health');

            if (response.status === 200) {
                setApiStatus('Online');
            } else {
                setApiStatus('Offline');
            }
        } catch (error) {
            setApiStatus('Offline');
        }
    };

    // UseEffect hook to check the API health on initial load
    useEffect(() => {
        checkApiHealth();
    }, []);

    // Function for sending a search request to the API
    const handleSend = async ({
        inputValue,
        alpha,
        startDate,
        endDate,
    }: HandleSendParams) => {
        setLoading(true);
        setGenerativeResult('Generating...');
        setSearchTerm(inputValue);
        setFilters({ alpha, startDate, endDate });
        setResults([]);
        checkApiHealth();

        try {
            const response = await fetch('http://localhost:4000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: inputValue,
                    alpha: alpha,
                    startDate: startDate,
                    endDate: endDate,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error);
            }

            const responseData = await response.json();
            setResults(responseData.objects);
            setGenerativeResult(responseData.generated);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setGenerativeResult(
                'Something went wrong. Please try again! ' +
                    (error as Error).message,
            );
            setResults([]);
            checkApiHealth();
        }
    };

    return (
        <div className="flex flex-col sm:flex-row min-h-screen">
            <div
                className={`flex-shrink-0 ${
                    isSidebarCollapsed ? 'sm:w-0 md:w-0' : 'sm:w-1/3 w-full'
                } transition-width duration-200`}
            >
                <SidebarCard
                    onSend={handleSend}
                    loading={loading}
                    selectedArticle={selectedArticle}
                    apiStatus={apiStatus}
                    isSidebarCollapsed={isSidebarCollapsed}
                />
            </div>
            <div
                className={`flex-grow lg:w-2/3 min-h-screen overflow-y-auto ${
                    isSidebarCollapsed ? 'block' : 'hidden'
                } lg:block`}
            >
                <div className="justify-center items-center">
                    <div className="pt-8 px-8">
                        <GenerativeCard
                            text={generativeResult}
                            loading={loading}
                        />
                        <ResultCard
                            articles={results}
                            searchTerm={searchTerm}
                            filters={filters}
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`fixed top-1/2 transform -translate-y-1/2 z-10 bg-zinc-500 text-white font-mono text-sm p-2 rounded-full transition-transform duration-200 ease-in-out hover:scale-105 lg:hidden hover:bg-green-500 ${
                    isSidebarCollapsed ? 'left-0 ml-4' : 'right-0 mr-4'
                }`}
            >
                {isSidebarCollapsed ? <FaAngleLeft /> : <FaAngleRight />}
            </button>
        </div>
    );
}
