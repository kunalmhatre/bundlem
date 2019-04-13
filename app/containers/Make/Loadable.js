/**
 *
 * Asynchronously loads the component for Make
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
