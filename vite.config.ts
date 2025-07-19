import html from "@tomjs/vite-plugin-html";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: "terser",
  },
  plugins: [html({ minify: true })],
});
