/*
 * Welcome Messages
 *
 * This contains all the text for the Welcome component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Welcome';

export default defineMessages({
  bundlem: {
    id: `${scope}.bundlem`,
    defaultMessage: 'Bundlem',
  },
  headLine: {
    id: `${scope}.headLine`,
    defaultMessage: 'Create and share your bundle of online resources',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'An easy way to bundle, store, and share your online resources like links of articles, videos or documents.',
  },
  createButton: {
    id: `${scope}.createButton`,
    defaultMessage: 'CREATE',
  },
  searchButton: {
    id: `${scope}.searchButton`,
    defaultMessage: 'SEARCH',
  },
  featuredBundles: {
    id: `${scope}.featuredBundles`,
    defaultMessage: 'FEATURED BUNDLES',
  },
  firstFeaturedBundleTitle: {
    id: `${scope}.firstFeaturedBundleTitle`,
    defaultMessage: 'UX - Few amazing and useful resources to build better products and to make your users satisfied',
  },
  secondFeaturedBundleTitle: {
    id: `${scope}.secondFeaturedBundleTitle`,
    defaultMessage: 'Songs which might make you feel good',
  },
});
