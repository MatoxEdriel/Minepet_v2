/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}"
    ],
    theme: {
        extend: {
            colors: {
                'techfix-bg': '#F3F8FA',
                'techfix-primary': '#0F1F2F',
                'techfix-blue': '#4FA3D1',
                'techfix-orange': '#F39C4A',
            },
        },
    },
    plugins: [
        require("daisyui")
    ],
    daisyui: {
        themes: ["light"],
    },
}