/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { compilerOptions } = require('./tsconfig');

const { resolve } = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@notifications/(.*)$': resolve(__dirname, './src/notifications/$1'),
    '^@places/(.*)$': resolve(__dirname, './src/places/$1'),
    '^@rooms/(.*)$': resolve(__dirname, './src/rooms/$1'),
    '^@devices/(.*)$': resolve(__dirname, './src/devices/$1'),
    '^@commons/(.*)$': resolve(__dirname, './src/commons/$1'),
    '^@health/(.*)$': resolve(__dirname, './src/health/$1'),
    '^@core/(.*)$': resolve(__dirname, './src/$1'),
    '^@root/(.*)$': resolve(__dirname, './src/../$1'),
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
};
