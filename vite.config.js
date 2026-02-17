import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || process.cwd()

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const host = env.VITE_HOST || process.env.VITE_HOST || 'localhost';
  const port = Number(env.VITE_PORT || process.env.VITE_PORT || 3173);

  return {
    plugins: [
      react(),
      tailwindcss(),
      // DO NOT REMOVE
      createIconImportProxy(),
    ],
    resolve: {
      alias: {
        '@': resolve(projectRoot, 'src')
      }
    },
    server: {
      host,
      port,
    },
    // Performance optimizations for production builds
    build: {
      // Use esbuild for minification (faster and built-in)
      minify: 'esbuild',
      // Code splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk for React and core libraries
            vendor: ['react', 'react-dom', 'react-router-dom'],
            // Animation library chunk
            animations: ['framer-motion'],
            // Icons chunk
            icons: ['@phosphor-icons/react']
          },
          // Asset file naming with hash for cache busting
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(assetInfo.name)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/\.(css)$/i.test(assetInfo.name)) {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      },
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // No source maps for production (smaller output)
      sourcemap: false,
      // CSS code splitting
      cssCodeSplit: true,
      // Target modern browsers for smaller bundles
      target: 'es2020'
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
    }
  }
});
