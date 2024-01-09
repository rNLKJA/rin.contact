module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // If using TypeScript
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Your custom rules here. For example:
    "react/react-in-jsx-scope": "off", // Not needed in Next.js
    "react/prop-types": "off", // If you are using TypeScript
    // Add more custom rules as needed
  },
};
