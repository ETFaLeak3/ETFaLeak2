import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import {svelte} from "@sveltejs/vite-plugin-svelte";
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        svelte({})
    ],
    resolve: {
        alias: {
            "$lib": path.resolve(__dirname, "resources/js/lib"),
            "@": path.resolve(__dirname, "resources/js"),
        }
    }
});
