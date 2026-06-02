import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "src/content/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(), // ISO date string
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).optional(),
    content: z.string(), // Explicit content property
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
      slug: document._meta.path,
    };
  },
});

export default defineConfig({
  content: [posts],
});
