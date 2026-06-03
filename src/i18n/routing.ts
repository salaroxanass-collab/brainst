import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it", "ro"],
  defaultLocale: "en",
  localePrefix: "always",
});
