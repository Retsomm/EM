import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),daisyui(),
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['autumn','business'], // 啟用 autumn 和 business 主題
    darkTheme: 'business', // 當進入暗黑模式時使用 business 主題
    base: true, // 啟用 DaisyUI 的基礎樣式
    styled: true, // 啟用 DaisyUI 的預設樣式
    utils: true, // 啟用 DaisyUI 的工具類
    logs: true, // 啟用 DaisyUI 的日誌輸出
    themeRoot: ':root', // 主題變量應用於 :root
  },
});
