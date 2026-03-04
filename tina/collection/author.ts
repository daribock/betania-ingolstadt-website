import type { Collection } from "tinacms";

const Author: Collection = {
  label: "Authors",
  name: "author",
  path: "content/authors",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
      description: "Full name of the author",
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar",
      description: "Profile picture of the author",
      // @ts-ignore
      uploadDir: () => "authors",
    },
  ],
};
export default Author;
