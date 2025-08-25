import { defineConfig } from 'tinacms';
import Post from './collection/post';
import Global from './collection/global';
import Author from './collection/author';
import Page from './collection/page';
import Tag from './collection/tag';

const branch: string =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  process.env.COOLIFY_BRANCH ||
  'main';

const config = defineConfig({
  token: process.env.TINA_TOKEN!,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  build: {
    publicFolder: 'public', // The public asset folder for your framework
    outputFolder: 'admin', // within the public folder
    basePath: '', // The base path of the app (could be /blog)
  },
  schema: {
    collections: [Page, Post, Author, Tag, Global],
  },
});

export default config;
