module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: 'src',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}
