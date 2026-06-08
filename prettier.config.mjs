const prettierConfig = {
  semi: false,
  singleQuote: false,
  trailingComma: "none",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
  tailwindFunctions: ["cn", "clsx", "cva"]
}

export default prettierConfig
