import {
  domain,
  verifyTokenAPI,
  publishBundleAPI,
} from '../apis';

describe('APIs', () => {
  it('verifyTokenAPI', () => {
    expect(verifyTokenAPI).toBe(`${domain}/verify`);
  });
  it('publishBundleAPI', () => {
    expect(publishBundleAPI).toBe(`${domain}/create`);
  });
});
