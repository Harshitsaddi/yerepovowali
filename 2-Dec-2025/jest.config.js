module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};
