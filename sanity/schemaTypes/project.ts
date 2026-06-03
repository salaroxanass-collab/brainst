import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title.en" } }),
    defineField({ name: "location", type: "localeString" }),
    defineField({ name: "year", type: "string" }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "landscape",
          "urban",
          "research",
          "nbs",
          "gis",
          "competition",
        ],
      },
    }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "description", type: "localeText" }),
    defineField({ name: "coverImage", type: "image" }),
    defineField({ name: "heroImage", type: "image" }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image" },
            { name: "caption", type: "localeString" },
          ],
        },
      ],
    }),
    defineField({ name: "mapCoords", type: "geopoint" }),
    defineField({
      name: "beforeAfter",
      type: "object",
      fields: [
        { name: "before", type: "image" },
        { name: "after", type: "image" },
      ],
    }),
    defineField({ name: "insights", type: "array", of: [{ type: "localeText" }] }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
