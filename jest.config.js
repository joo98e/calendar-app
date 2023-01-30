// /** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./"
});
/** @type {import("jest").Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@pages/(.*)$": "<rootDir>/pages/$1",
    "^@atoms/(.*)$": "<rootDir>/components/common/atoms/$1",
    "^@store/(.*)$": "<rootDir>/store/$1",
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }]
  },
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tests/tsconfig.goods.json"
    }
  },
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"]
};

module.exports = createJestConfig(customJestConfig);
