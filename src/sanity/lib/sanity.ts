import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: "w0m43m5i",
    dataset: "production",
    apiVersion: "v1",
    useCdn: false,
  });

const builder = imageUrlBuilder(client)

export function urlFor(source: unknown) {
    if (source && typeof source === "object") {
      return builder.image(source);
    }
    throw new Error("Invalid source type");
  }
  