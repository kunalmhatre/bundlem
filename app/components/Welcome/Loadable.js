/**
 *
 * Asynchronously loads the component for Welcome
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
