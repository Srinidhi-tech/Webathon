import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function copyPublicFiles() {
  return {
    name: 'copy-public-files',
    closeBundle() {
      const publicDir = path.resolve(__dirname, 'public');
      const outDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      const files = fs.readdirSync(publicDir);
      for (const file of files) {
        if (!file.includes(' ')) {
          try {
            fs.copyFileSync(path.join(publicDir, file), path.join(outDir, file));
          } catch (_) {}
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyPublicFiles()],
  build: {
    copyPublicDir: false,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
