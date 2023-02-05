/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./resources/**/app.blade.php",
        "./resources/frontend/**/*.jsx",
        "./resources/frontend/**/*.js",
        "./resources/frontend/**/*.tsx",
        "./resources/frontend/**/*.ts",
    ],
    theme: {
        extend: {
            // Set font family
            fontFamily: {
                sans: ["Century Gothic", ...defaultTheme.fontFamily.sans],
            },
            // Set theme colors (Required config!)
            colors: {
                primary: colors.blue,
                secondary: colors.slate,
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms")
    ],
};
