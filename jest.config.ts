import type { Config } from "@jest/types";

const config : Config.InitialOptions = {
  preset : 'ts-jest',
  testEnvironment : 'node', 
  verbose : true
};

export default config;

// import type { Config } from "@jest/types";

// const config: Config.InitialOptions = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   verbose: true,
//   collectCoverage: true, 
//   collectCoverageFrom: [
//     "src/**/*.{ts,tsx}", 
//     "!src/index.ts" 
//   ],
//   coverageDirectory: "coverage", 
//   coverageReporters: ["text", "lcov"], 
// };

// export default config;
