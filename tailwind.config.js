/** @type {import('tailwindcss').Config} */
const { fontFamily, screens } = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundColor: ["even", "odd"],
			fontFamily: {
				sans: ["var(--font-inter)", ...fontFamily.sans],
			},
			screens: {
				mobile: {'max': "768px"},
				...screens,
			},
			
		},
	},
	plugins: [],
};
