/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            poppins: ["Poppins"],
        },
        extend: {
            colors: {
                primary: "#EF4444",
            },
        },
    },
    plugins: [],
};
