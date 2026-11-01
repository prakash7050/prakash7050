import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset paths valid on GitHub Pages (/prakash7050/)
export default defineConfig({ base: "./", plugins: [react()] });
