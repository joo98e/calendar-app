// /** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./"
});
/** @type {import("jest").Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/__mocks__/fileMock.js`
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }]
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.test.json'
    }
  }

};

module.exports = createJestConfig(customJestConfig);