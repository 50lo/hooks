module.exports = {
        testEnvironment: "node",
       transform: {
               "^.+\\.tsx?$": [
                       "ts-jest",
                       {
                               tsconfig: "tsconfig.json",
                       },
               ],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	testPathIgnorePatterns: ["node_modules", "lib"],
	setupFiles: ["./jest.setup.js"],
}
