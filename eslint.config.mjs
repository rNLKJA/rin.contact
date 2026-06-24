import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// ESLint 9 requires flat config, and Next.js 16 removed `next lint`, so linting
// now runs through the ESLint CLI directly against this file.
// Migrated from the legacy .eslintrc.json.
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "public/sw.js"],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/next-script-for-ga": "off",
      indent: "off",
      "no-unused-vars": "warn",
      "no-console": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "import/no-anonymous-default-export": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // New React Compiler-powered rules in eslint-config-next 16. Surfaced as
      // warnings (consistent with the rest of this config) so they're visible
      // without blocking CI on a large pre-existing backlog; fix incrementally.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
];

export default eslintConfig;
