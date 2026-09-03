import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Vite configuration
  vite: {
    server: {
      allowedHosts: ["ee3d-103-18-35-23.ngrok-free.app"],
    },
  },
  // Automatically target Vercel when deployed on Vercel or when NITRO_PRESET=vercel is set
  nitro: {
    preset: process.env.NITRO_PRESET || (process.env.VERCEL ? "vercel" : "cloudflare-module"),
  },
  tanstackStart: {},
});
