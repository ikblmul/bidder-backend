import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "../tsconfig.json";

console.log(compilerOptions);
const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "../../../src"],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
export default jestConfig;
