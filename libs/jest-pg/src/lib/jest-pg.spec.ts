import { jestPg } from './jest-pg';

describe('jestPg', () => {
  it('should work', () => {
    expect(jestPg()).toEqual('jest-pg');
  });
});
