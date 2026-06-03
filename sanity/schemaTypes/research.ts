import { defineType, defineField } from "sanity";

export const research = defineType({
  name: "research",
  title: "Research",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title.en" } }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "description", type: "localeText" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "coverImage", type: "image" }),
    defineField({ name: "pdf", type: "file" }),
    defineField({ name: "mapCoords", type: "geopoint" }),
    defineField({ name: "order", type: "number" }),
  ],
});
