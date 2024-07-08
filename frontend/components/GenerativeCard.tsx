// Import React and other necessary dependencies
import React from 'react';
import Typewriter from 'typewriter-effect';
import { GenerativeCardProps } from '@/types/types';

// Format the generated result with html tag for typewriter
const formatGeneratedResult = (text: string): string => {
    return text
        .replace(/(\d\.\s)/g, '<br><br>$1')
        .replace(
            /-\s\[Read more\]\((https:\/\/[^\\)]+)\)/g,
            '<br>- [Read more](<a href="$1" style="color: #60a5fa;">$1</a>)',
        );
};

// Define the GenerativeCard functional component
const GenerativeCard: React.FC<GenerativeCardProps> = ({ text, loading }) => {
    const formattedText = formatGeneratedResult(text);
    return (
        // Render a card with typewriter effect
        <div
            className="bg-gray-100 rounded-lg shadow-md p-6 animate-pop-in font-mono relative table-container border-2 border-blue-500 border-dashed text-black text-xs overflow-y-auto "
            style={{ maxHeight: '375px' }}
        >
            <div className="flex">
                {/* Render a loading spinner if loading */}
                {loading && (
                    <svg
                        className="animate-spin mr-2 h-4 w-4 text-blue-900"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25 text-blue-900"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75 text-blue-600"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1-1.647z"
                        ></path>
                    </svg>
                )}

                <h4 className="font-bold font-roboto text-md text-blue-400 mb-2">
                    🤖 Generated Top 5 Articles Summary
                </h4>
            </div>
            {/* Use the Typewriter effect to type out the provided text */}
            {text ? (
                <Typewriter
                    key={text}
                    onInit={(typewriter) => {
                        typewriter.typeString(formattedText).start();
                    }}
                    options={{ delay: 10 }}
                />
            ) : (
                <p>
                    No Article found. Try a different alpha filter on the
                    slider.
                </p>
            )}
        </div>
    );
};

export default GenerativeCard;
