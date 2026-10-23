
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE || (command === 'serve' ? '/' : '/vir-groupv7/'),

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
}));
