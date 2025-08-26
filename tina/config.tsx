import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from 'tinacms-authjs/dist/tinacms';
import {
  defineConfig as defineConfig,
  LocalAuthProvider as LocalAuthProvider,
} from 'tinacms';
import Post from './collection/post';
import Global from './collection/global';
import Author from './collection/author';
import Page from './collection/page';
import Tag from './collection/tag';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD;

if (!branch) {
  throw new Error('Branch is not defined');
}

const config = defineConfig({
  contentApiUrlOverride: '/api/tina/gql',
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  branch,
  media: {
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
    collections: [TinaUserCollection, Page, Post, Author, Tag, Global],
  },
});
export default config;
