import fetchBundle from '../services';

describe('Bundle services', () => {
  describe('fetchBundle - getBundleAPI', () => {
    const bundleID = 1337;

    it('returns bundle on 200', async () => {
      const bundle = {
        id: bundleID,
        title: 'testTitle',
        description: 'testDescription',
        resources: [
          {
            title: 'testTitle',
            notes: 'testNotes',
            link: 'https://google.com',
            resourceType: 'WEB PAGE',
          },
        ],
      };

      global.fetch = jest
        .fn()
        .mockImplementation(() => ({
          status: 200,
          json: () => Promise.resolve({ bundle }),
        }));

      const callResult = await fetchBundle(bundleID);

      expect(callResult).toEqual({
        data: { bundle },
        isFailed: false,
        errorCode: null,
      });
    });

    it('returns errorCode on 404', async () => {
      global.fetch = jest
        .fn()
        .mockImplementation(() => ({ status: 404 }));

      const callResult = await fetchBundle(bundleID);

      expect(callResult).toEqual({
        data: null,
        isFailed: true,
        errorCode: 'error404',
      });
    });

    it('returns errorCode on 500', async () => {
      global.fetch = jest
        .fn()
        .mockImplementation(() => ({ status: 500 }));

      const callResult = await fetchBundle(bundleID);

      expect(callResult).toEqual({
        data: null,
        isFailed: true,
        errorCode: 'error500',
      });
    });

    it('returns errorCode on 1337 (default case)', async () => {
      global.fetch = jest
        .fn()
        .mockImplementation(() => ({ status: 1337 }));

      const callResult = await fetchBundle(bundleID);

      expect(callResult).toEqual({
        data: null,
        isFailed: true,
        errorCode: 'errorDefault',
      });
    });
  });
});
