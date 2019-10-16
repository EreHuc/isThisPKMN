export function mockStore(storePath, mockFn = jest.fn) {
  jest.mock(storePath, () => {
    return mockFn();
  });
}
