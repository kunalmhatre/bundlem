/**
 *
 * Asynchronously loads the component for Publish
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
