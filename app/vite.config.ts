import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [reactRefresh(), viteCompression()],
    server: {
      port: 4000,
      open: true,
      proxy: {
        "/api": {
          target: 'http://localhost:4001' || loadEnv(mode, process.cwd()).VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
      },
    },
  });
