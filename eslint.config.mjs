import next from "eslint-config-next/core-web-vitals";

// Flat config for ESLint 9 + Next.js 16 (the `next lint` command was removed in
// Next 16, so linting now runs through the ESLint CLI directly: `eslint .`).
// Rules below mirror the previous .eslintrc.json overrides.
const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"],
  },
  ...next,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/next-script-for-ga": "off",
      "indent": "off",
      "no-unused-vars": "warn",
      "no-console": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "import/no-anonymous-default-export": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // New React Compiler rules enabled by eslint-config-next@16 /
      // eslint-plugin-react-hooks@6. The codebase predates them with ~100
      // pre-existing hits; kept as warnings so they stay visible to burn down
      // over time rather than blocking every push. Revisit and tighten to
      // "error" once the existing cases are cleaned up.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
];

export default eslintConfig;
