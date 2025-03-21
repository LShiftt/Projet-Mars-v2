import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "./",
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        terre: path.resolve(__dirname, "terre.html"),
        about: path.resolve(__dirname, "atterrissage.html"),
        contact: path.resolve(__dirname, "game.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias @ → src/
      "@img": path.resolve(__dirname, "public/img"), // Alias pour accès rapide aux assets
      "@model": path.resolve(__dirname, "public/model"), // Alias pour accès rapide aux assets
      "@sound": path.resolve(__dirname, "public/sound"), // Alias pour accès rapide aux assets
    },
  },
  server: {
    open: true, // Ouvre automatiquement le navigateur au démarrage
    port: 3200,
  },

  json: {
    namedExports: true,
    stringify: false,
  },
});
