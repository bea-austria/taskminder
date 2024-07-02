import { defineConfig } from "electron-vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    publicDir: false,
    main: {
        entry: '/out/main/main.js',
        vite: {
            build: {
              rollupOptions: {
                external: ['iohook'],
                output: {
                  format: 'cjs', // CommonJS format for the main process
                },
              },
            },
        },
    },
    preload: {},
    renderer: {
        plugins: [react()]
    },
});
