import { createDatabase, createLocalDatabase } from '@tinacms/datalayer';
import { GitHubProvider } from 'tinacms-gitprovider-github';
import { MongodbLevel } from 'mongodb-level';

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'local';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined');
}

if (!owner || !repo || !token) {
  throw new Error(
    'GITHUB_OWNER, GITHUB_REPO, and GITHUB_PERSONAL_ACCESS_TOKEN must be defined'
  );
}

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner,
        repo,
        token,
        commitMessage: `feat: update content with tinacms`,
      }),
      databaseAdapter: new MongodbLevel({
        collectionName: `tinacms-${branch}`,
        dbName: 'tinacms',
        mongoUri,
      }),
      namespace: branch,
    });
