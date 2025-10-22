// noinspection JSUnusedGlobalSymbols

import { defineBoot } from '#q-app/wrappers';
import { IconSet } from 'quasar';

const iconSetList = import.meta.glob('../../node_modules/quasar/icon-set/*.js');

export default defineBoot(async () => {
  await iconSetList['../../node_modules/quasar/icon-set/svg-mdi-v7.js']()
    .then((setDefinition) => IconSet.set(setDefinition.default))
    .catch((err) => console.log(err));
});
