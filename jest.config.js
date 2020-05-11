module.exports = {
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    moduleFileExtensions: [
        "js",
        "ts"
    ],
    testMatch: [
        "**/test/**/*.test.ts"
    ],
    testEnvironnement: "node"
}