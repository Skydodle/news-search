// Import React and other necessary dependencies
import React from 'react';
import ConsoleCard from './ConsoleCard';
import { SidebarCardProps } from '@/types/types';

// Define the SidebarCard functional component
const SidebarCard: React.FC<SidebarCardProps> = ({
    onSend,
    loading,
    apiStatus,
    isSidebarCollapsed,
}) => {
    // Main component rendering
    return (
        <div
            className="lg:w-1/3 md:w-full sm:w-full h-screen fixed shadow-lg overflow-y-auto bg-slate-900"
            style={{
                backgroundImage: "url('/banner.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: isSidebarCollapsed ? 'translateX(-100%)' : 'none',
            }}
        >
            <>
                <div className=" text-white px-8 pt-4 flex flex-col justify-center items-center mb-4">
                    <div>
                        <div className="flex p-6 justify-center items-center">
                            <img
                                src="/news-search-logo.svg"
                                alt="News Search Logo"
                                className="w-auto h-32"
                            />
                        </div>
                        <div className="flex justify-center my-2">
                            <a
                                className="cursor-pointer transform transition duration-500 ease-in-out hover:scale-150"
                                href="https://www.weaviate.io"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="/weaviate-icon.png"
                                    alt="Weaviate"
                                    className="w-8 h-8 mx-2 cursor-pointer"
                                />
                            </a>
                            <a
                                className="cursor-pointer transform transition duration-500 ease-in-out hover:scale-150"
                                href="https://github.com/weaviate/healthsearch-demo"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="/github-icon.png"
                                    alt="Github"
                                    className="w-8 h-8 mx-2 cursor-pointer"
                                />
                            </a>
                        </div>
                        {/* Welcome message and instructions */}
                        <div className="flex flex-col justify-center items-center pb-4">
                            <div className="w-full lg:w-full md:w-3/4 sm:w-1/2">
                                <p className="text-sm font-mono bg-black bg-opacity-10 p-3 shadow-lg rounded-lg">
                                    {' '}
                                    Welcome to NewsSearch! Explore the BBC News
                                    RSS feed dataset for articles using keyword,
                                    hybrid, or semantic search filters. This
                                    demo further leverages generative search to
                                    highlight the top 5 articles with the
                                    greatest potential public influence, along
                                    with concise summaries.
                                </p>
                            </div>
                            {/* Display API and version status */}
                            <div className="mt-4 text-xs text-white font-mono flex justify-center">
                                <span className="rounded-indicator neon-text">
                                    Powered by Weaviate
                                </span>
                                <span
                                    className={`rounded-indicator text-white ${
                                        apiStatus === 'Online'
                                            ? 'neon-text'
                                            : 'bg-red-500'
                                    }`}
                                >
                                    Demo {apiStatus}
                                </span>
                                <span className="rounded-indicator neon-text">
                                    v1.1.0
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ConsoleCard for sending queries */}
                <ConsoleCard onSend={onSend} loading={loading} />
            </>
        </div>
    );
};

export default SidebarCard;
