import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["@/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  alias: {
    "shared": fileURLToPath(new URL("./shared", import.meta.url)),
    "@": fileURLToPath(new URL("./app", import.meta.url)),
    "~": fileURLToPath(new URL("./", import.meta.url)),
  },
});
