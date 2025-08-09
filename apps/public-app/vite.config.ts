import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@shared/ui": resolve(__dirname, "../../packages/shared-ui/src"),
      "@shared/store": resolve(__dirname, "../../packages/shared-store/src"),
    },
  },
  server: {
    port: 3001,
    host: true,
  },
  build: {
    outDir: "dist",
  },
});
