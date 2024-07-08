// Import React and other necessary dependencies
import { ConsoleCardProps, HandleSendParams } from '@/types/types';
import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const ConsoleCard: React.FC<ConsoleCardProps> = ({ onSend, loading }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [alpha, setAlpha] = useState(0.5);
    const [fade, setFade] = useState('fade-in');
    const [errorMessage, setErrorMessage] = useState('');

    const searchSuggestions = [
        'dutch football',
        'politics',
        'latest technology',
        'economic concerns',
        'health science',
        'football championship',
        'entertainment celebrity gossip',
        'climate change',
        'best food in netherland',
    ];

    const allSuggestions = searchSuggestions;
    const [currentIndex, setCurrentIndex] = useState(0);

    // Define the weeks and corresponding start and end dates
    const weeks = [
        {
            label: '06-28-2024 to 07-05-2024',
            start: '2024-06-28T00:00:00Z',
            end: '2024-07-05T23:59:59Z',
        },
        {
            label: '06-21-2024 to 06-27-2024',
            start: '2024-06-21T00:00:00Z',
            end: '2024-06-27T23:59:59Z',
        },
        {
            label: '06-14-2024 to 06-20-2024',
            start: '2024-06-14T00:00:00Z',
            end: '2024-06-20T23:59:59Z',
        },
        {
            label: '06-07-2024 to 06-13-2024',
            start: '2024-06-07T00:00:00Z',
            end: '2024-06-13T23:59:59Z',
        },
    ];

    const [selectedWeek, setSelectedWeek] = useState(weeks[0]);

    const handleLeftNav = () => {
        setFade('fade-out');
        setTimeout(() => {
            if (currentIndex === 0) {
                setCurrentIndex(allSuggestions.length - 3);
            } else {
                setCurrentIndex(currentIndex - 3);
            }
            setFade('fade-in');
        }, 250);
    };

    const handleRightNav = () => {
        setFade('fade-out');
        setTimeout(() => {
            if (currentIndex + 3 >= allSuggestions.length) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(currentIndex + 3);
            }
            setFade('fade-in');
        }, 250);
    };

    const handleGenerate = () => {
        if (!inputValue) {
            setErrorMessage('Please enter a search term.');
            return;
        }
        setErrorMessage('');
        const params: HandleSendParams = {
            inputValue,
            alpha,
            startDate: selectedWeek.start,
            endDate: selectedWeek.end,
        };
        onSend(params);
    };

    return (
        <div className="animate-pop-in">
            <div
                className="relative bg-slate-800 rounded-lg  table-container shadow-lg flex flex-col justify-between border-2 border-dashed border-green-500 mx-5 p-5"
                style={{ position: 'relative' }}
            >
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                            <span className="bg-red-500 rounded-full w-2 h-2 mr-1"></span>
                            <span className="bg-yellow-500 rounded-full w-2 h-2 mr-1"></span>
                            <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
                            <span className="font-mono text-sm text-white">
                                💬 Natural Language Query
                            </span>
                        </div>
                    </div>

                    {/* Search Console Section*/}
                    <div className="bg-slate-900 p-5 rounded-lg animate-pop-in-late">
                        <div className="flex items-center text-white font-mono">
                            <textarea
                                value={inputValue}
                                placeholder="What current event are you interested in...?"
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full bg-transparent text-white outline-none font-mono"
                            />
                        </div>
                    </div>

                    {/* Suggested SearchTerm Section */}
                    <div className="flex mt-2 space-x-2 justify-between">
                        <button
                            onClick={handleLeftNav}
                            className="bg-slate-700 hover:bg-green-500 text-white text-xs font-semibold py-1 px-2 rounded-md transition duration-500 ease-in-out"
                        >
                            <FaArrowLeft />
                        </button>
                        {allSuggestions
                            .slice(currentIndex, currentIndex + 3)
                            .map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => setInputValue(suggestion)}
                                    className={`bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-1 px-2 rounded-md ${fade}`}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        <button
                            onClick={handleRightNav}
                            className="bg-slate-700 hover:bg-green-500 text-white text-xs font-semibold py-1 px-2 rounded-md transition duration-500 ease-in-out"
                        >
                            <FaArrowRight />
                        </button>
                    </div>

                    {/* Slider Filter Section */}
                    <div className="mt-4 flex flex-col items-center">
                        <div className="w-full flex flex-row items-center justify-between">
                            <span className="text-xs text-white font-mono">
                                Keyword Search <br></br>Only
                            </span>
                            <div className="relative flex w-full mx-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={alpha}
                                    onChange={(e) =>
                                        setAlpha(parseFloat(e.target.value))
                                    }
                                    className="w-full"
                                    style={{ zIndex: 1 }} // Ensures the slider is above the label
                                />
                                <div
                                    className="absolute text-sm text-white font-mono bg-slate-700 px-1 rounded-md"
                                    style={{
                                        left: `${alpha * 100}%`,
                                        transform: 'translateX(-50%)',
                                        marginBottom: '-1.5rem', // Adjust this value as needed
                                        bottom: 0, // Position at the bottom of the slider
                                    }}
                                >
                                    {alpha.toFixed(2)}
                                </div>
                            </div>
                            <span className="text-xs text-white font-mono">
                                Vector Search <br></br> Only
                            </span>
                        </div>
                    </div>

                    {/* Week Filter Section */}
                    <div className="mt-4 flex items-center">
                        <label className="text-white text-xs font-mono mr-2">
                            Select Week:
                        </label>
                        <select
                            value={selectedWeek.label}
                            onChange={(e) => {
                                const week = weeks.find(
                                    (w) => w.label === e.target.value,
                                );
                                if (week) {
                                    setSelectedWeek(week);
                                }
                            }}
                            className="bg-slate-900 text-white text-sm font-mono"
                        >
                            {weeks.map((week, index) => (
                                <option key={index} value={week.label}>
                                    {week.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* ToolTip Section */}
                <div className="flex justify-between pt-5">
                    <div className="relative">
                        <button
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-2 px-3 rounded-full hover:ring-2 hover:ring-slate-400"
                        >
                            ?
                        </button>
                        {showTooltip && (
                            <div className="absolute bottom-full left-0 text-xs bg-slate-700 text-white font-mono p-3 w-60 rounded z-50 mb-2 shadow-lg">
                                The hybrid search alpha parameter allows you to
                                adjust the weight towards favoring more keyword
                                search results or more vector search results.
                            </div>
                        )}
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-xs font-mono mt-2">
                            {errorMessage}
                        </div>
                    )}
                    {/* Generate Button Section */}
                    <div className="flex items-center">
                        <button
                            onClick={handleGenerate}
                            className="bg-green-500 hover:bg-green-400 text-white text-xs font-semibold py-2 px-4 rounded animate-pop-more-late"
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsoleCard;
