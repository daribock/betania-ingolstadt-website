import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  // Global ignores
  {
    ignores: [
      'tina/**/*',
      'public/**/*',
      'tina/__generated__/**/*',
      '.tina/**/*',
      'node_modules/**/*',
      '.next/**/*',
      'out/**/*',
      'dist/**/*',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
