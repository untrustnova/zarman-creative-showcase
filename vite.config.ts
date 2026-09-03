import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Konfigurasi untuk Vite diletakkan di sini
  vite: {
    server: {
      allowedHosts: ["ee3d-103-18-35-23.ngrok-free.app"],
    },
  },
  // Konfigurasi untuk TanStack Start tetap aman jika dibiarkan default
  tanstackStart: {},
});
