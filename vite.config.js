
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE || (command === 'serve' ? '/' : '/vir-groupv10/'),

  plugins: [
    react(),
    tailwindcss(),
  ],

  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@AllSection': fileURLToPath(new URL('./src/All Section', import.meta.url)),
      '@media': fileURLToPath(new URL('./public/media', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
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
