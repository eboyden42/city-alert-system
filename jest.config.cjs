module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['alert-system-prototype/jest.setup.cjs'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'alert-system-prototype/tsconfig.app.json',
    }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': 'alert-system-prototype/__mocks__/fileMock.cjs',
  },
};