import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    coverage: {
      include: ["src/app/api/analyze/route.ts", "src/components/Survey/SurveyForm.tsx", "src/lib/wellness.ts"],
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
