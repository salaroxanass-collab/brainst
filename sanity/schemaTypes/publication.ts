import { defineType, defineField } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title.en" } }),
    defineField({ name: "authors", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({
      name: "type",
      type: "string",
      options: { list: ["journal", "conference", "report"] },
    }),
    defineField({ name: "venue", type: "string" }),
    defineField({ name: "abstract", type: "localeText" }),
    defineField({ name: "pdf", type: "file" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
  ],
});
