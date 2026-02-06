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
                'techfix-blue': '#140B05',
                'techfix-orange': '#F39C4A',
                'minepet-magenta': '#d946ef',
                'minepet-pink': '#E25F95',
                'minepet-pink-black': '#C44681'


                //mantener color principal. 


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