import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import dynamicImport from "vite-plugin-dynamic-import";

export default defineConfig({
    build: {
        target: "esnext",
        outDir: "public_html/build",
        assetsDir: "assets",
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/frontend"),
        },
    },
    plugins: [
        laravel({
            publicDirectory: "public_html",
            input: ["resources/frontend/main.tsx"],
            refresh: true
        }),
        react({
            include: "resources/frontend/**/*.tsx",
        }),
        dynamicImport(),
    ],
});
