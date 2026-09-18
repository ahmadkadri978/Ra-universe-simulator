import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig({
  plugins: [react()],
  resolve: { preserveSymlinks: process.env.RA_IN_PROCESS_COMPILER === '1' },
  server: {
    host: '127.0.0.1',
    port: 5174,
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
