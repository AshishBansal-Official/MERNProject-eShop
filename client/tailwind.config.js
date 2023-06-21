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
            screens: {
                "app-min-md": "1352px",
                "app-md": { max: "1352px" },
                "app-sm": { max: "840px" },
                "app-xs": { max: "656px" },
                "app-xxs": { max: "450px" },
            },
        },
    },
    plugins: [],
};
