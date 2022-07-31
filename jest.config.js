const nextJest = require("next/jest")

const createJestConfig = nextJest({
    dir: "./",
})

const config = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
}

module.exports = createJestConfig(config)