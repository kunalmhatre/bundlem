/**
 *
 * Asynchronously loads the component for Robot
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
