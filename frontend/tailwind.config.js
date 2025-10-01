// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Chú ý: Hãy chắc chắn đường dẫn content khớp với cấu trúc dự án của bạn
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}" // Thêm nếu bạn có thư mục components
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  // ----> THÊM DÒNG NÀY VÀO <----
  presets: [require("nativewind/preset")],
};