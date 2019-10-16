import connect from '../../../Game/utils/connect';

describe('connect.js', () => {
  it('should connect', () => {
    expect(connect()).toBeTruthy();
  });
});
