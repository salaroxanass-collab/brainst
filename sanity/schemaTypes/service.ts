import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "key", type: "string" }),
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "description", type: "localeText" }),
    defineField({ name: "icon", type: "string" }),
    defineField({ name: "order", type: "number" }),
  ],
});
