import { defineType, defineField } from "sanity";

export const news = defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title.en" } }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "excerpt", type: "localeText" }),
    defineField({ name: "body", type: "localeText" }),
  ],
});
