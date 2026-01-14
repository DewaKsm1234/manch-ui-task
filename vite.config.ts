import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8000,
  },
  plugins: [react(),tailwindcss(), mode === "development" && { name: "dev-plugin" }].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
