import { defineConfig } from "electron-vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    publicDir: false,
    main: {},
    preload: {},
    renderer: {
        plugins: [react()]
    },
    server: {
        proxy: {
            '/api': 'http://localhost:5000'
        }
    }
});
