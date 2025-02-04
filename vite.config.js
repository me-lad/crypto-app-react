import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  return {
    base: "/crypto",
    build: {
      target: mode == "production" ? "es2015" : "es2022",
    },

    server: {
      port: 9000,
    },

    plugins: [react()],
    esbuild: { legalComments: "none" },
  };
});
