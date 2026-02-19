import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { scormPlugin } from 'scorm'
import cfg from "./scorm.config";
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    scormPlugin(cfg),
    tailwindcss(),
  ],
})
