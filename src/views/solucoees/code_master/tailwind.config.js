/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            colors: {
                editor: {
                    bg: '#1e1e1e',
                    sidebar: '#252526',
                    active: '#3e3e42',
                    text: '#d4d4d4'
                }
            }
        },
    },
    plugins: [],
}
