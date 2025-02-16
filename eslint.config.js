export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      'quotes': ['error', 'single'],  // Enforce single quotes
      'semi': ['error', 'always']     // Enforce semicolons
    }
  }
];
