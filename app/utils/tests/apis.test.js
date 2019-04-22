import {
  nodeAppDomain,
  verifyTokenAPI,
  publishBundleAPI,
} from '../apis';

describe('APIs', () => {
  it('verifyTokenAPI', () => {
    expect(verifyTokenAPI).toBe(`${nodeAppDomain}/verify`);
  });
  it('publishBundleAPI', () => {
    expect(publishBundleAPI).toBe(`${nodeAppDomain}/create`);
  });
});
