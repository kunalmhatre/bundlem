/**
 *
 * Asynchronously loads the component for Bundle
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
