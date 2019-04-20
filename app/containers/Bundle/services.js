import { getBundleAPI } from '../../utils/apis';

export default async function fetchBundle(bundleID) {
  const callResult = {
    data: null,
    isFailed: false,
    errorCode: null,
  };

  const response = await fetch(`${getBundleAPI}/${bundleID}`);

  switch (response.status) {
    case 200: {
      const data = await response.json();
      callResult.data = data;
      break;
    }
    case 404:
      callResult.isFailed = true;
      callResult.errorCode = 'error404';
      break;
    case 500:
      callResult.isFailed = true;
      callResult.errorCode = 'error500';
      break;
    default:
      callResult.isFailed = true;
      callResult.errorCode = 'errorDefault';
  }

  return Promise.resolve(callResult);
}
