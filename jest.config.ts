export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.test.ts"],
    moduleFileExtensions: ["ts", "js"],
    clearMocks: true,
    setupFiles: ["dotenv/config"], // Load environment variables for tests
  };
  