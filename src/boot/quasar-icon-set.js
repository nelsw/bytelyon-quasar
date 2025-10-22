// noinspection JSUnusedGlobalSymbols

import { defineBoot } from '#q-app/wrappers';
import { IconSet } from 'quasar';

const iconSetList = import.meta.glob('../../node_modules/quasar/icon-set/*.js');

export default defineBoot(async ({ssrContext}) => {
  await iconSetList['../../node_modules/quasar/icon-set/svg-mdi-v7.js']()
    .then((setDefinition) => IconSet.set(setDefinition.default, ssrContext))
    .catch((err) => console.log(err));
});
