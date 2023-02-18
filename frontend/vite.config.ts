import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Forward all development requests to the same target!
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  // using the `webapp` base path for production builds
  // so that we can leverage phoenix's static file serving
  base: process.env.NODE_ENV === "production" ? "/webapp/" : "/",
})
