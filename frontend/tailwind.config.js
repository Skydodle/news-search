/** @type {import('tailwindcss').Config} */
export const content = [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
    screens: {
        sm: '100px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
    extend: {
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        fontFamily: {
            merriweather: ['Merriweather', 'serif'],
        },
    },
};
export const plugins = [];